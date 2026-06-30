const en = {
    nav: {
        home: "Home",
        about: "About Us",
        reviews: "Reviews",
    },
    home: {
        tagline: "Your trusted source for professional power tools and industrial equipment.",
        whyUs: {
            certified: {
                title: "Certified Products",
                desc: "All products are certified and guaranteed original because we are an official distributor.",
            },
            delivery: {
                title: "Fast Delivery",
                desc: "We ship to all over Indonesia with fast and reliable logistics provided by our e-commerce partners or you can order by using WhatsApp",
            },
            wideRange: {
                title: "Wide-range of product",
                desc: "We offer many products from power tools, industrial tools and many more. See our products here!",
            },
            quality: {
                title: "Quality",
                desc: "Every product sent-out has undergoes QC to ensure customer satisfaction",
            },
        },
    },
    about: {
        whoWeAre: "Who We Are",
        aboutUs: "About Us",
        distributorWords: ["NRT", "PRO", "&", "Yamamax", "Pro", "Official", "Distributor"],
        paragraph:
            "MajuSuksesTeknik is the official distributor of NRT Pro and Yamamax Pro, providing customers with genuine products, reliable support, and trusted solutions for professional and industrial applications. We are committed to delivering high-quality equipment and accessories while ensuring competitive pricing, product authenticity, and excellent customer service.",
        locatedAt: "We are located at",
        address: "Dadap, Kosambi, Tangerang Regency, Banten 15211",
        getDirections: "Get Directions",
        ourVideos: "Our Videos",
        browseVideosDesc: "Browse all our product videos",
        browseNRT: "Browse NRT PRO in Youtube",
        browseYamamax: "Browse Yamamax Pro in Youtube",
        trustedBy: "Trusted By",
    },
    review: {
        whatPeopleSay: "What People Say",
        ourReviews: "Our Reviews",
        leaveAReview: "Leave a Review",
        name: "Name",
        namePlaceholder: "Your name...",
        rating: "Rating",
        reviewLabel: "Review",
        reviewPlaceholder: "Write your review here...",
        validationError: "Name, comment, and a star rating are required.",
        rateLimitedError: "You can only post one review per day.",
        couldNotLoad: "Could not load reviews",
        couldNotSubmit: "Could not submit review",
        thanks: "Thanks for your review!",
        cooldownPrefix: "You can submit another review in ",
        cooldownSuffix: ".",
        submitting: "Submitting...",
        alreadySubmitted: "Already submitted today",
        submitReview: "Submit Review",
        loadingReviews: "Loading reviews...",
        noReviewsYet: "No reviews yet",
        beFirstToReview: "Be the first to leave a review!",
    },
    footer: {
        rights: "All Rights Reserved.",
        links: "Links",
        marketplace: "Marketplace",
        socialMedia: "Social Media",
        contact: "Contact",
        address: "Address",
        addressCountryCity: "Indonesia, Jakarta",
        addressFull: "Dadap, Kosambi, Tangerang Regency, Banten 15211",
    },
};

type Translations = typeof en;

const id: Translations = {
    nav: {
        home: "Beranda",
        about: "Tentang Kami",
        reviews: "Ulasan",
    },
    home: {
        tagline: "Sumber terpercaya Anda untuk peralatan listrik profesional dan perlengkapan industri.",
        whyUs: {
            certified: {
                title: "Produk Bersertifikat",
                desc: "Semua produk telah bersertifikat dan dijamin asli karena kami adalah distributor resmi.",
            },
            delivery: {
                title: "Pengiriman Cepat",
                desc: "Kami mengirim ke seluruh Indonesia dengan logistik yang cepat dan terpercaya dari mitra e-commerce kami, atau Anda bisa memesan lewat WhatsApp",
            },
            wideRange: {
                title: "Beragam Produk",
                desc: "Kami menyediakan berbagai produk mulai dari peralatan listrik, peralatan industri, dan banyak lagi. Lihat produk kami di sini!",
            },
            quality: {
                title: "Kualitas",
                desc: "Setiap produk yang dikirim telah melalui QC untuk memastikan kepuasan pelanggan",
            },
        },
    },
    about: {
        whoWeAre: "Siapa Kami",
        aboutUs: "Tentang Kami",
        distributorWords: ["NRT", "PRO", "&", "Yamamax", "Pro", "Distributor", "Resmi"],
        paragraph:
            "MajuSuksesTeknik adalah distributor resmi NRT Pro dan Yamamax Pro, menyediakan produk asli, dukungan yang andal, dan solusi terpercaya bagi pelanggan untuk kebutuhan profesional dan industri. Kami berkomitmen menghadirkan peralatan dan aksesori berkualitas tinggi dengan harga kompetitif, keaslian produk, dan pelayanan pelanggan yang prima.",
        locatedAt: "Kami berlokasi di",
        address: "Dadap, Kosambi, Kabupaten Tangerang, Banten 15211",
        getDirections: "Lihat Rute",
        ourVideos: "Video Kami",
        browseVideosDesc: "Jelajahi semua video produk kami",
        browseNRT: "Lihat NRT PRO di Youtube",
        browseYamamax: "Lihat Yamamax Pro di Youtube",
        trustedBy: "Dipercaya Oleh",
    },
    review: {
        whatPeopleSay: "Kata Mereka",
        ourReviews: "Ulasan Kami",
        leaveAReview: "Tulis Ulasan",
        name: "Nama",
        namePlaceholder: "Nama Anda...",
        rating: "Rating",
        reviewLabel: "Ulasan",
        reviewPlaceholder: "Tulis ulasan Anda di sini...",
        validationError: "Nama, ulasan, dan rating bintang wajib diisi.",
        rateLimitedError: "Anda hanya dapat mengirim satu ulasan per hari.",
        couldNotLoad: "Gagal memuat ulasan",
        couldNotSubmit: "Gagal mengirim ulasan",
        thanks: "Terima kasih atas ulasan Anda!",
        cooldownPrefix: "Anda dapat mengirim ulasan lagi dalam ",
        cooldownSuffix: ".",
        submitting: "Mengirim...",
        alreadySubmitted: "Sudah mengirim hari ini",
        submitReview: "Kirim Ulasan",
        loadingReviews: "Memuat ulasan...",
        noReviewsYet: "Belum ada ulasan",
        beFirstToReview: "Jadilah yang pertama memberi ulasan!",
    },
    footer: {
        rights: "Hak Cipta Dilindungi.",
        links: "Tautan",
        marketplace: "Marketplace",
        socialMedia: "Media Sosial",
        contact: "Kontak",
        address: "Alamat",
        addressCountryCity: "Indonesia, Jakarta",
        addressFull: "Dadap, Kosambi, Kabupaten Tangerang, Banten 15211",
    },
};

export const translations: Record<"en" | "id", Translations> = { en, id };
export type { Translations };
