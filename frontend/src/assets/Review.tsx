import { useEffect, useState } from "react";
import { Star, MessageSquareDashed, User, MessageSquare } from "lucide-react";
import { useLanguage } from "../i18n/useLanguage";
import type { Translations } from "../i18n/translations";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8080";
const COOLDOWN_KEY = "mst_last_review_at";
const COOLDOWN_MS = 24 * 60 * 60 * 1000;

function readCooldownUntil(): number | null {
    const raw = localStorage.getItem(COOLDOWN_KEY);
    if (!raw) return null;
    const until = Number(raw) + COOLDOWN_MS;
    return until > Date.now() ? until : null;
}

function formatRemaining(ms: number): string {
    const totalMinutes = Math.ceil(ms / 60000);
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    if (hours <= 0) return `${minutes}m`;
    return `${hours}h ${minutes}m`;
}

const KNOWN_BACKEND_ERRORS: Record<string, keyof Translations["review"]> = {
    "name, comment, and rating (1-5) are required": "validationError",
    "you can only post one review per day": "rateLimitedError",
};

type ReviewItem = {
    id: number;
    name: string;
    rating: number;
    comment: string;
    created_at: string;
};

function Review() {
    const { t } = useLanguage();
    const [rating, setRating] = useState(0);
    const [hovered, setHovered] = useState(0);
    const [name, setName] = useState("");
    const [comment, setComment] = useState("");
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState(false);

    const [reviews, setReviews] = useState<ReviewItem[]>([]);
    const [loadingReviews, setLoadingReviews] = useState(true);
    const [cooldownUntil, setCooldownUntil] = useState<number | null>(() => readCooldownUntil());

    useEffect(() => {
        fetchReviews();
        const interval = setInterval(() => setCooldownUntil(readCooldownUntil()), 60000);
        return () => clearInterval(interval);
    }, []);

    async function fetchReviews() {
        setLoadingReviews(true);
        try {
            const res = await fetch(`${API_URL}/reviews`);
            if (!res.ok) throw new Error("could not load reviews");
            setReviews(await res.json());
        } catch (err) {
            void err;
        } finally {
            setLoadingReviews(false);
        }
    }

    async function handleSubmit() {
        setError("");
        setSuccess(false);

        if (!name.trim() || !comment.trim() || rating < 1 || rating > 5) {
            setError(t.review.validationError);
            return;
        }

        setSubmitting(true);
        try {
            const res = await fetch(`${API_URL}/reviews`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name, comment, rating }),
            });

            if (!res.ok) {
                const body = await res.json().catch(() => ({}));
                if (res.status === 429) {
                    setCooldownUntil(Date.now() + COOLDOWN_MS);
                }
                const key = KNOWN_BACKEND_ERRORS[body.error];
                throw new Error(key ? t.review[key] : body.error || t.review.couldNotSubmit);
            }

            localStorage.setItem(COOLDOWN_KEY, String(Date.now()));
            setCooldownUntil(Date.now() + COOLDOWN_MS);
            setName("");
            setComment("");
            setRating(0);
            setSuccess(true);
            fetchReviews();
        } catch (err) {
            setError(err instanceof Error ? err.message : t.review.couldNotSubmit);
        } finally {
            setSubmitting(false);
        }
    }

    const isCoolingDown = cooldownUntil !== null && cooldownUntil > Date.now();

    return (
        <div className="relative mx-4 sm:mx-8 md:mx-16 lg:mx-32 xl:mx-44 py-12 overflow-hidden">
            <section id="reviews" />

            {/* Background glows */}
            <div className="absolute top-1/2 left-0 w-80 h-80 bg-blue-600/5 rounded-full blur-3xl pointer-events-none -translate-y-1/2" />
            <div className="absolute top-1/2 right-0 w-80 h-80 bg-indigo-600/5 rounded-full blur-3xl pointer-events-none -translate-y-1/2" />

            {/* Heading */}
            <div className="flex items-center mb-10">
                <div className="flex-1 h-px bg-linear-to-r from-transparent to-slate-700/60" />
                <div className="text-center mx-8">
                    <div className="text-xs font-bold tracking-[0.25em] uppercase text-blue-400 mb-1">{t.review.whatPeopleSay}</div>
                    <div className="text-2xl sm:text-3xl text-white font-semibold">{t.review.ourReviews}</div>
                </div>
                <div className="flex-1 h-px bg-linear-to-l from-transparent to-slate-700/60" />
            </div>

            <div className="flex flex-col lg:flex-row gap-6">
                {/* Submit form */}
                <div className="flex-1 relative bg-slate-900/80 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-7 flex flex-col gap-5 lg:h-128">
                    <div className="absolute top-0 left-8 right-8 h-px bg-linear-to-r from-transparent via-blue-500/40 to-transparent" />

                    <div className="flex items-center gap-2 mb-1">
                        <div className="w-8 h-8 rounded-lg bg-blue-600/20 flex items-center justify-center">
                            <MessageSquare className="w-4 h-4 text-blue-400" />
                        </div>
                        <h3 className="text-white font-semibold text-lg">{t.review.leaveAReview}</h3>
                    </div>

                    <div className="flex flex-col gap-1.5">
                        <label className="flex items-center gap-1.5 text-slate-400 text-xs font-semibold tracking-widest uppercase">
                            <User className="w-3 h-3" /> {t.review.name}
                        </label>
                        <input
                            className="bg-slate-800/80 border border-slate-700/80 rounded-xl px-4 py-2.5 text-white text-sm placeholder-slate-600 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/30 transition duration-200"
                            placeholder={t.review.namePlaceholder}
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>

                    <div className="flex flex-col gap-2">
                        <label className="text-slate-400 text-xs font-semibold tracking-widest uppercase">{t.review.rating}</label>
                        <div className="flex gap-1.5">
                            {[1, 2, 3, 4, 5].map((star) => (
                                <Star
                                    key={star}
                                    className={`w-8 h-8 cursor-pointer transition-all duration-150 ${
                                        star <= (hovered || rating)
                                            ? "text-yellow-400 fill-yellow-400 scale-110"
                                            : "text-slate-700 hover:text-slate-500"
                                    }`}
                                    onMouseEnter={() => setHovered(star)}
                                    onMouseLeave={() => setHovered(0)}
                                    onClick={() => setRating(star)}
                                />
                            ))}
                        </div>
                    </div>

                    <div className="flex flex-col gap-1.5">
                        <label className="flex items-center gap-1.5 text-slate-400 text-xs font-semibold tracking-widest uppercase">
                            <MessageSquareDashed className="w-3 h-3" /> {t.review.reviewLabel}
                        </label>
                        <textarea
                            className="bg-slate-800/80 border border-slate-700/80 rounded-xl px-4 py-2.5 text-white text-sm placeholder-slate-600 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/30 transition duration-200 resize-none min-h-32"
                            placeholder={t.review.reviewPlaceholder}
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                        />
                    </div>

                    {error && <p className="text-red-400 text-sm">{error}</p>}
                    {success && <p className="text-green-400 text-sm">{t.review.thanks}</p>}
                    {isCoolingDown && cooldownUntil && (
                        <p className="text-slate-500 text-sm">
                            {t.review.cooldownPrefix}{formatRemaining(cooldownUntil - Date.now())}{t.review.cooldownSuffix}
                        </p>
                    )}

                    <button
                        onClick={handleSubmit}
                        disabled={submitting || isCoolingDown}
                        className="mt-1 bg-linear-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold py-2.5 rounded-xl transition duration-300 ease-in-out shadow-lg shadow-blue-900/30 hover:shadow-blue-800/40"
                    >
                        {submitting ? t.review.submitting : isCoolingDown ? t.review.alreadySubmitted : t.review.submitReview}
                    </button>
                </div>

                {/* Reviews display */}
                <div className="themed-scrollbar flex-1 relative bg-slate-900/80 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-7 flex flex-col gap-4 h-96 lg:h-128 overflow-y-auto">
                    <div className="absolute top-0 left-8 right-8 h-px bg-linear-to-r from-transparent via-blue-500/40 to-transparent" />

                    {loadingReviews ? (
                        <div className="flex-1 flex items-center justify-center text-slate-500 text-sm">{t.review.loadingReviews}</div>
                    ) : reviews.length === 0 ? (
                        <div className="flex-1 flex flex-col items-center justify-center text-center gap-4">
                            <div className="relative">
                                <div className="w-24 h-24 rounded-full bg-blue-600/10 flex items-center justify-center">
                                    <div className="w-16 h-16 rounded-full bg-blue-600/10 flex items-center justify-center">
                                        <MessageSquare className="w-8 h-8 text-slate-500" />
                                    </div>
                                </div>
                                <div className="absolute inset-0 rounded-full bg-blue-500/5 blur-xl" />
                            </div>

                            <div>
                                <p className="text-slate-300 text-base font-medium">{t.review.noReviewsYet}</p>
                                <p className="text-slate-600 text-sm mt-1">{t.review.beFirstToReview}</p>
                            </div>
                        </div>
                    ) : (
                        reviews.map((rev) => (
                            <div
                                key={rev.id}
                                className="bg-slate-800/60 border border-slate-700/60 rounded-xl p-4 flex flex-col gap-1.5"
                            >
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-1.5 text-slate-200 font-semibold text-sm">
                                        <User className="w-3.5 h-3.5 text-blue-400" /> {rev.name}
                                    </div>
                                    <div className="flex gap-0.5">
                                        {[1, 2, 3, 4, 5].map((star) => (
                                            <Star
                                                key={star}
                                                className={`w-3.5 h-3.5 ${
                                                    star <= rev.rating ? "text-yellow-400 fill-yellow-400" : "text-slate-700"
                                                }`}
                                            />
                                        ))}
                                    </div>
                                </div>
                                <p className="text-slate-400 text-sm">{rev.comment}</p>
                                <p className="text-slate-600 text-xs">
                                    {new Date(rev.created_at).toLocaleDateString()}
                                </p>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    )
}
export default Review;
