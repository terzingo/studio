import type { Tailor, Product } from './types';

const mockTailors: Tailor[] = [
  {
    id: 'ahmet-yilmaz',
    name: 'Atölye Yılmaz',
    specialty: 'Erkek & Kadın Giyim',
    location: 'İstanbul, Beşiktaş, Levent',
    rating: 4.9,
    reviews: 124,
    imageId: 'tailor-1',
    portfolioImageIds: ['portfolio-2', 'portfolio-9', 'portfolio-6'],
    bio: '20 yıllık tecrübemizle, klasik ve modern giyimde kişiye özel çözümler sunuyoruz. TerzinGo noktası olarak, online alışverişlerinizdeki tadilat ihtiyaçlarınızı karşılıyoruz.',
    services: [
      { name: 'Paça Tadilatı', price: 'Ücretsiz*' },
      { name: 'Bel Tadilatı', price: 'Ücretsiz*' },
      { name: 'Özel Dikim Takım Elbise', price: '8000 TL' },
      { name: 'Gömlek Dikimi', price: '1500 TL' },
      { name: 'Abiye Tadilatı', price: '750 TL' },
    ],
    customerReviews: [
        { id: 'rev1', name: 'Can B.', rating: 5, comment: 'TerzinGo koduyla pantolonumu ücretsiz yaptırdım. Çok memnun kaldım.', date: '12.05.2024' },
        { id: 'rev2', name: 'Selim K.', rating: 5, comment: 'Hızlı ve kaliteli hizmet. Kesinlikle tavsiye ederim.', date: '01.04.2024' }
    ]
  },
  {
    id: 'zeynep-kaya',
    name: 'Moda Evi Zeynep',
    specialty: 'Gelinlik ve Abiye',
    location: 'Ankara, Çankaya, Kızılay',
    rating: 5.0,
    reviews: 98,
    imageId: 'tailor-2',
    portfolioImageIds: ['portfolio-1', 'portfolio-3', 'portfolio-8'],
    bio: 'Moda tasarımı mezunuyum ve 10 yıldır kendi atölyemde hizmet veriyorum. TerzinGo anlaşmamızla internetten aldığınız abiyelerin tadilatlarını da yapıyoruz.',
    services: [
      { name: 'Elbise Boyu Kısaltma', price: 'Ücretsiz*' },
      { name: 'Pens Tadilatı', price: 'Ücretsiz*' },
      { name: 'Özel Dikim Gelinlik', price: '15000 TL' },
      { name: 'Abiye Elbise Dikimi', price: '7000 TL' },
    ],
    customerReviews: [
        { id: 'rev3', name: 'Ebru S.', rating: 5, comment: 'İnternetten aldığım elbiseyi Zeynep Hanım tam üstüme göre ayarladı, harika oldu!', date: '20.06.2024' },
        { id: 'rev4', name: 'Demet A.', rating: 5, comment: 'İlgisi ve yeteneği inanılmaz. TerzinGo hizmeti çok pratik.', date: '15.05.2024' }
    ]
  },
  {
    id: 'mustafa-ozen',
    name: 'Deri Atölyesi Özen',
    specialty: 'Deri ve Vintage Giyim',
    location: 'İzmir, Konak, Alsancak',
    rating: 4.8,
    reviews: 75,
    imageId: 'tailor-3',
    portfolioImageIds: ['portfolio-4', 'portfolio-5', 'portfolio-7'],
    bio: 'Deri ve vintage parçalara olan tutkumu mesleğime dönüştürdüm. TerzinGo noktası olarak ceket ve pantolon tadilatlarınızı özenle yapıyorum.',
    services: [
      { name: 'Paça Tadilatı', price: 'Ücretsiz*' },
      { name: 'Özel Dikim Deri Ceket', price: '6000 TL' },
      { name: 'Vintage Ceket Onarımı', price: '1000 TL' },
      { name: 'Kot Pantolon Daraltma', price: '300 TL' },
    ],
    customerReviews: [
        { id: 'rev5', name: 'Ozan T.', rating: 5, comment: 'Mustafa Usta deriyi konuşturuyor. Ceketim yeniden doğmuş gibi oldu.', date: '05.06.2024' }
    ]
  },
  {
    id: 'fatma-demir',
    name: 'Pratik Terzi Fatma',
    specialty: 'Hızlı Tadilat',
    location: 'İstanbul, Kadıköy, Moda',
    rating: 4.7,
    reviews: 210,
    imageId: 'tailor-4',
    portfolioImageIds: ['portfolio-6', 'portfolio-7', 'portfolio-8'],
    bio: 'Her türlü tadilat işleriniz için güvenilir adresiniz. Hızlı, temiz ve uygun fiyatlı hizmet sunuyorum. TerzinGo müşterilerine öncelikli hizmet veriyorum.',
    services: [
      { name: 'Paça Tadilatı', price: 'Ücretsiz*' },
      { name: 'Fermuar Değişimi', price: '150 TL' },
      { name: 'Elbise Boyu Kısaltma', price: 'Ücretsiz*' },
      { name: 'Beden Daraltma', price: '400 TL' },
    ],
    customerReviews: [
        { id: 'rev6', name: 'Ayşe G.', rating: 4, comment: 'Fatma Hanım çok hızlı ve işini iyi yapıyor. TerzinGo koduyla geldim, hemen yardımcı oldu.', date: '18.06.2024' }
    ]
  },
  {
    id: 'kenan-erkin',
    name: 'Gömlek Atölyesi',
    specialty: 'Bespoke Gömlek',
    location: 'İstanbul, Şişli, Nişantaşı',
    rating: 4.9,
    reviews: 88,
    imageId: 'tailor-5',
    portfolioImageIds: ['portfolio-6', 'portfolio-9'],
    bio: 'Sadece size özel, bedeninize mükemmel oturan gömlekler tasarlıyorum. Online aldığınız gömleklerin kol boyu ve pens ayarlarını TerzinGo ile ücretsiz yapıyoruz.',
    services: [
      { name: 'Kol Boyu Kısaltma', price: 'Ücretsiz*' },
      { name: 'Pens Tadilatı', price: 'Ücretsiz*' },
      { name: 'Özel Dikim Gömlek (Mısır Pamuğu)', price: '2500 TL' },
      { name: 'Monogram İşleme', price: '200 TL' },
    ],
    customerReviews: [
        { id: 'rev7', name: 'Barış A.', rating: 5, comment: 'Gömleklerim hiç bu kadar iyi olmamıştı. Kenan Bey gerçekten bir sanatçı.', date: '25.05.2024' }
    ]
  },
  {
    id: 'sibel-canan',
    name: 'Sibelin Çocuk Dünyası',
    specialty: 'Çocuk Giyimi',
    location: 'Ankara, Yenimahalle, Batıkent',
    rating: 4.8,
    reviews: 65,
    imageId: 'tailor-6',
    portfolioImageIds: ['portfolio-8'],
    bio: 'Çocuklarınız için hem rahat hem de şık kıyafetler tasarlıyorum. İnternetten aldığınız çocuk kıyafetlerinin tadilatları için TerzinGo noktasıyız.',
    services: [
      { name: 'Paça Kısaltma', price: 'Ücretsiz*' },
      { name: 'Bel Daraltma', price: 'Ücretsiz*' },
      { name: 'Özel Dikim Çocuk Elbisesi', price: '1200 TL' },
      { name: 'Kostüm Dikimi', price: '1500 TL' },
    ],
    customerReviews: [
        { id: 'rev8', name: 'Pelin V.', rating: 5, comment: 'Kızımın elbisesini tam üzerine göre yaptılar. Çok teşekkürler.', date: '02.06.2024' }
    ]
  },
  {
    id: 'mehmet-usta',
    name: 'Usta Eller',
    specialty: 'Genel Tadilat',
    location: 'İzmir, Bornova, Küçükpark',
    rating: 4.6,
    reviews: 152,
    imageId: 'tailor-7',
    portfolioImageIds: ['portfolio-2', 'portfolio-7'],
    bio: 'Mahallenizin güvenilir terzisi. 30 yıllık tecrübe ile her türlü tadilat işiniz itina ile yapılır. TerzinGo ile dijital dünyadayız.',
    services: [
      { name: 'Paça Kısaltma', price: 'Ücretsiz*' },
      { name: 'Fermuar Değişimi', price: '120 TL' },
    ],
    customerReviews: [
      { id: 'rev9', name: 'Ahmet Y.', rating: 5, comment: 'Mehmet Usta işinin ehlidir. Her zaman memnun ayrılırım.', date: '11.07.2024' }
    ]
  },
  {
    id: 'aylin-tasarim',
    name: 'Aylin Tasarım',
    specialty: 'Kadın Giyim & Tasarım',
    location: 'İstanbul, Kadıköy, Göztepe',
    rating: 4.9,
    reviews: 89,
    imageId: 'tailor-8',
    portfolioImageIds: ['portfolio-1', 'portfolio-8'],
    bio: 'Kişiye özel tasarımlar ve modern dokunuşlarla kıyafetlerinize hayat veriyorum. TerzinGo müşterilerine özel ilgi.',
    services: [
      { name: 'Elbise Daraltma', price: 'Ücretsiz*' },
      { name: 'Özel Bluz Dikimi', price: '900 TL' },
    ],
    customerReviews: [
      { id: 'rev10', name: 'Zeynep D.', rating: 5, comment: 'Aylin Hanım harikalar yaratıyor. Eski elbisemi yeni gibi yaptı.', date: '09.07.2024' }
    ]
  },
  {
    id: 'emre-klasik',
    name: 'Emre Klasik Giyim',
    specialty: 'Klasik Erkek Giyim',
    location: 'Ankara, Çankaya, Tunalı Hilmi',
    rating: 4.8,
    reviews: 110,
    imageId: 'tailor-9',
    portfolioImageIds: ['portfolio-2', 'portfolio-9'],
    bio: 'Klasik giyim sanattır. Takım elbiselerinizi, ceketlerinizi ilk günkü özenle tamir ediyor, size özel hale getiriyoruz.',
    services: [
      { name: 'Ceket Kol Boyu', price: 'Ücretsiz*' },
      { name: 'Takım Elbise Tadilatı', price: '1200 TL' },
    ],
    customerReviews: [
      { id: 'rev11', name: 'Kaan A.', rating: 5, comment: 'İşçilikleri mükemmel. Takım elbisem tam üstüme oturdu.', date: '01.07.2024' }
    ]
  },
  {
    id: 'deniz-butik',
    name: 'Deniz Butik Terzi',
    specialty: 'Günlük Giyim Tadilatı',
    location: 'İzmir, Karşıyaka, Bostanlı',
    rating: 4.7,
    reviews: 130,
    imageId: 'tailor-10',
    portfolioImageIds: ['portfolio-5', 'portfolio-7'],
    bio: 'Günlük kıyafetlerinizdeki küçük dokunuşlarla büyük farklar yaratıyoruz. TerzinGo koduyla tüm işlemleriniz daha hızlı.',
    services: [
      { name: 'Pantolon Daraltma', price: 'Ücretsiz*' },
      { name: 'Tişört Boyu Kısaltma', price: '100 TL' },
    ],
    customerReviews: [
      { id: 'rev12', name: 'Seda N.', rating: 4, comment: 'Hızlı ve pratik çözümler için teşekkürler.', date: '28.06.2024' }
    ]
  },
  {
    id: 'levent-giyim',
    name: 'Levent Giyim & Tadilat',
    specialty: 'Genel Giyim',
    location: 'İstanbul, Beşiktaş, Etiler',
    rating: 4.5,
    reviews: 95,
    imageId: 'tailor-11',
    portfolioImageIds: ['portfolio-6'],
    bio: 'Her türlü giyim eşyanız için profesyonel tadilat hizmeti sunmaktayız.',
    services: [
      { name: 'Paça Tadilatı', price: 'Ücretsiz*' }
    ],
    customerReviews: [
      { id: 'rev13', name: 'Caner T.', rating: 4, comment: 'İşlerini iyi yapıyorlar, tavsiye ederim.', date: '25.06.2024' }
    ]
  },
  {
    id: 'bebek-terzi',
    name: 'Bebek Terzihanesi',
    specialty: 'Lüks Giyim Tadilat',
    location: 'İstanbul, Beşiktaş, Bebek',
    rating: 4.9,
    reviews: 78,
    imageId: 'tailor-12',
    portfolioImageIds: ['portfolio-9'],
    bio: 'Marka kıyafetlerinizin orijinal dokusunu bozmadan, özenle tadilatını yapıyoruz.',
    services: [
      { name: 'Marka Ceket Tadilatı', price: '1500 TL' }
    ],
    customerReviews: [
      { id: 'rev14', name: 'Leyla H.', rating: 5, comment: 'Pahalı ceketimi gönül rahatlığıyla emanet ettim, sonuç harika.', date: '22.06.2024' }
    ]
  },
  {
    id: 'bostanci-terzi',
    name: 'Bostancı Terzi',
    specialty: 'Hızlı ve Güvenilir',
    location: 'İstanbul, Kadıköy, Bostancı',
    rating: 4.6,
    reviews: 180,
    imageId: 'tailor-13',
    portfolioImageIds: ['portfolio-7'],
    bio: 'Acil tadilat işleriniz için Bostancı\'daki adresiniz. TerzinGo ile sıra beklemeden hizmet alın.',
    services: [
      { name: 'Fermuar Değişimi', price: '150 TL' }
    ],
    customerReviews: [
      { id: 'rev15', name: 'Murat S.', rating: 5, comment: 'Aynı gün içinde pantolonumu hallettiler. Çok teşekkürler.', date: '20.06.2024' }
    ]
  },
  {
    id: 'mecidiyekoy-modern',
    name: 'Modern Terzi Mecidiyeköy',
    specialty: 'Modern Kesimler',
    location: 'İstanbul, Şişli, Mecidiyeköy',
    rating: 4.7,
    reviews: 115,
    imageId: 'tailor-14',
    portfolioImageIds: ['portfolio-6'],
    bio: 'Kıyafetlerinize modern bir dokunuş katmak için buradayız. Genç ve dinamik ekibimizle hizmetinizdeyiz.',
    services: [
      { name: 'Slim Fit Tadilat', price: 'Ücretsiz*' }
    ],
    customerReviews: [
      { id: 'rev16', name: 'Gizem A.', rating: 5, comment: 'Gömleğimi tam istediğim gibi daralttılar.', date: '18.06.2024' }
    ]
  }
];

const mockProducts: Product[] = [
  { id: 'prod-1', name: 'Vintage Deri Ceket', price: 850, category: 'İkinci El', imageId: 'product-1', tailorId: 'mustafa-ozen', description: '1980\'lerden kalma, mükemmel kondisyonda, zamansız bir parça. Hakiki deriden üretilmiştir ve içi astarlıdır. Zamanın eskitemediği bir stil için ideal.', brand: 'Bilinmiyor (Vintage)', condition: 'Az kullanılmış', fabric: 'Hakiki Deri', measurements: { shoulder: '48 cm', bust: '112 cm', sleeve: '65 cm', length: '70 cm' } },
  { id: 'prod-2', name: 'Özel Tasarım Abiye', price: 6500, category: 'Özel Tasarım', imageId: 'product-2', tailorId: 'zeynep-kaya', description: 'Tamamen el işlemesi, ipek şifon üzerine boncuk ve kristal detaylarla süslenmiş, tek omuzlu, A kesim abiye elbise. Mezuniyet ve özel davetler için tasarlandı.', brand: 'Moda Evi Zeynep', condition: 'Yeni gibi', fabric: 'İpek Şifon', measurements: { bust: '90 cm', waist: '72 cm', length: '155 cm' } },
  { id: 'prod-3', name: 'Pamuklu Yazlık Elbise', price: 450, category: 'İkinci El', imageId: 'product-3', tailorId: 'fatma-demir', description: 'Çiçek desenli, %100 pamuklu, nefes alan kumaştan, çok rahat bir yazlık elbise. Sadece birkaç kez giyildi, hiçbir kusuru yoktur.', brand: 'Bilindik Marka', condition: 'Yeni gibi', fabric: '%100 Pamuk', measurements: { bust: '95 cm', waist: '80 cm', length: '110 cm' } },
  { id: 'prod-4', name: 'İtalyan Kesim Gömlek', price: 1800, category: 'Özel Tasarım', imageId: 'product-4', tailorId: 'kenan-erkin', description: 'Mısır pamuğundan, bedene oturan kalıbıyla özel olarak dikilmiş erkek gömleği. Manşetlere isteğe bağlı monogram işlenebilir.', brand: 'Gömlek Atölyesi', condition: 'Yeni gibi', fabric: 'Mısır Pamuğu', measurements: { shoulder: '46 cm', sleeve: '66 cm', waist: '100 cm' } },
  { id: 'prod-5', name: 'Marka Kot Pantolon', price: 500, category: 'İkinci El', imageId: 'product-5', tailorId: 'ahmet-yilmaz', description: 'Çok az kullanılmış, eskitme detaylı, boru paça kot pantolon. Rengi ve dokusu ilk günkü gibidir.', brand: 'Bilindik Marka', condition: 'Az kullanılmış', fabric: 'Denim', measurements: { waist: '84 cm', hip: '102 cm', length: '105 cm' } },
  { id: 'prod-6', name: 'Kız Çocuk Kostümü', price: 900, category: 'Özel Tasarım', imageId: 'product-6', tailorId: 'sibel-canan', description: 'Elsa temalı, tül ve saten kumaşlardan yapılmış, el işlemesi kar tanesi detaylı kostüm. 5-6 yaş için uygundur.', brand: 'Sibelin Çocuk Dünyası', condition: 'Yeni gibi', fabric: 'Saten ve Tül', measurements: { bust: '60 cm', length: '90 cm' } },
  { id: 'prod-7', name: 'Kaşmir Kaban', price: 2500, category: 'İkinci El', imageId: 'product-7', tailorId: 'emre-klasik', description: 'Yumuşak dokulu, saf kaşmirden, klasik kesim erkek kabanı. Soğuk kış günleri için idealdir.', brand: 'Vintage', condition: 'İyi durumda', fabric: 'Kaşmir', measurements: { shoulder: '50 cm', sleeve: '68 cm', length: '100 cm' } },
  { id: 'prod-8', name: 'İpek Bluz', price: 750, category: 'Özel Tasarım', imageId: 'product-8', tailorId: 'aylin-tasarim', description: 'Saf ipekten, dökümlü, fırfır detaylı şık bluz.', brand: 'Aylin Tasarım', condition: 'Yeni gibi', fabric: 'İpek', measurements: { bust: '98 cm', length: '65 cm' } },
  { id: 'prod-9', name: 'Keten Pantolon', price: 600, category: 'İkinci El', imageId: 'product-9', tailorId: 'deniz-butik', description: 'Yazlık, rahat kesim, bej rengi keten pantolon.', brand: 'Bilindik Marka', condition: 'Az kullanılmış', fabric: 'Keten', measurements: { waist: '80 cm', hip: '100 cm', length: '102 cm' } },
  { id: 'prod-10', name: 'Yün Kazak', price: 400, category: 'İkinci El', imageId: 'product-10', tailorId: 'mehmet-usta', description: 'Sıcak tutan, boğazlı, İskandinav desenli yün kazak.', brand: 'Vintage', condition: 'İyi durumda', fabric: 'Yün', measurements: { bust: '108 cm', sleeve: '64 cm', length: '72 cm' } }
];


export function getTailors(): Tailor[] {
  return mockTailors;
}

export function getTailorById(id: string): Tailor | undefined {
  return mockTailors.find(t => t.id === id);
}

export function getProducts(): Product[] {
  return mockProducts;
}

export function getProductById(id: string): Product | undefined {
    return mockProducts.find(p => p.id === id);
}


// --- NEW DYNAMIC LOCATION DATA GENERATION ---

const allTurkeyProvinces = [
  "Adana", "Adıyaman", "Afyonkarahisar", "Ağrı", "Amasya", "Ankara", "Antalya", "Artvin", "Aydın", "Balıkesir",
  "Bilecik", "Bingöl", "Bitlis", "Bolu", "Burdur", "Bursa", "Çanakkale", "Çankırı", "Çorum", "Denizli",
  "Diyarbakır", "Edirne", "Elazığ", "Erzincan", "Erzurum", "Eskişehir", "Gaziantep", "Giresun", "Gümüşhane", "Hakkâri",
  "Hatay", "Isparta", "Mersin", "İstanbul", "İzmir", "Kars", "Kastamonu", "Kayseri", "Kırklareli", "Kırşehir",
  "Kocaeli", "Konya", "Kütahya", "Malatya", "Manisa", "Kahramanmaraş", "Mardin", "Muğla", "Muş", "Nevşehir",
  "Niğde", "Ordu", "Rize", "Sakarya", "Samsun", "Siirt", "Sinop", "Sivas", "Tekirdağ", "Tokat",
  "Trabzon", "Tunceli", "Şanlıurfa", "Uşak", "Van", "Yozgat", "Zonguldak", "Aksaray", "Bayburt", "Karaman",
  "Kırıkkale", "Batman", "Şırnak", "Bartın", "Ardahan", "Iğdır", "Yalova", "Karabük", "Kilis", "Osmaniye",
  "Düzce"
];

// Helper to generate a random number within a range
const getRandomInt = (min: number, max: number) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

// Generic list of districts and neighborhoods to be used for provinces without specific data
const genericDistricts = {
  "Merkez": { count: getRandomInt(1, 5), neighborhoods: ["Yeni Mahalle", "Cumhuriyet Mahallesi", "Atatürk Mahallesi"] },
  "Sanayi": { count: getRandomInt(1, 3), neighborhoods: ["Organize Sanayi Bölgesi", "Sanayi Sitesi"] },
  "Yıldız": { count: getRandomInt(1, 2), neighborhoods: ["Yıldıztepe", "Ayyıldız"] }
};

// Specific data for major cities to make it more realistic
const istanbulDistricts = {
  Beşiktaş: { count: getRandomInt(2, 5), neighborhoods: ['Levent', 'Etiler', 'Bebek'] },
  Kadıköy: { count: getRandomInt(3, 6), neighborhoods: ['Moda', 'Göztepe', 'Bostancı'] },
  Şişli: { count: getRandomInt(2, 4), neighborhoods: ['Nişantaşı', 'Mecidiyeköy', 'Harbiye'] },
};

const ankaraDistricts = {
  Çankaya: { count: getRandomInt(3, 7), neighborhoods: ['Kızılay', 'Tunalı Hilmi', 'Balgat'] },
  Yenimahalle: { count: getRandomInt(1, 4), neighborhoods: ['Batıkent', 'Demetevler', 'Şentepe'] },
  Keçiören: { count: getRandomInt(1, 3), neighborhoods: ['Etlik', 'Aktepe', 'Sanatoryum'] },
};

const izmirDistricts = {
  Konak: { count: getRandomInt(2, 4), neighborhoods: ['Alsancak', 'Göztepe', 'Hatay'] },
  Bornova: { count: getRandomInt(1, 4), neighborhoods: ['Küçükpark', 'Evka 3', 'Özkanlar'] },
  Karşıyaka: { count: getRandomInt(2, 5), neighborhoods: ['Bostanlı', 'Mavişehir', 'Alaybey'] },
};


type LocationData = {
    [city: string]: {
        count: number;
        districts: {
            [district: string]: {
                count: number;
                neighborhoods: string[];
            }
        }
    }
}

// Generate the full location data structure
export const allLocationsData = allTurkeyProvinces.reduce((acc: LocationData, city) => {
    let districts;
    let cityCount: number;

    // Use specific data for major cities, generic for others
    if (city === 'İstanbul') {
        districts = istanbulDistricts;
    } else if (city === 'Ankara') {
        districts = ankaraDistricts;
    } else if (city === 'İzmir') {
        districts = izmirDistricts;
    } else {
        districts = genericDistricts;
    }
    
    // Calculate total count for the city by summing up district counts
    cityCount = Object.values(districts).reduce((sum, district) => sum + district.count, 0);

    // Ensure cityCount is at least 1 for most provinces
    // Let's allow 5 provinces to have 0 tailors as requested
    const zeroProvinces = ["Bayburt", "Tunceli", "Ardahan", "Kilis", "Iğdır"];
    if (cityCount === 0 && !zeroProvinces.includes(city)) {
        cityCount = getRandomInt(1, 3);
    }
    // Final check for the 5 provinces that can be zero
    if(zeroProvinces.includes(city)){
        cityCount = 0;
    }


    acc[city] = {
        count: cityCount,
        districts: cityCount > 0 ? districts : {} // If city has no tailors, it has no districts with tailors
    };
    
    return acc;
}, {});
