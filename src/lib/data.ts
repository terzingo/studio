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
    location: 'İstanbul, Kadıköy, Göztepe',
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
    location: 'Ankara, Çankaya, Tunalı Hilmi',
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
  }
];

const mockProducts: Product[] = [
  { id: 'prod-1', name: 'Vintage Deri Ceket', price: 850, category: 'İkinci El', imageId: 'product-1', tailorId: 'mustafa-ozen', description: '1980\'lerden kalma, mükemmel kondisyonda, zamansız bir parça. Hakiki deriden üretilmiştir ve içi astarlıdır. Zamanın eskitemediği bir stil için ideal.', brand: 'Bilinmiyor (Vintage)', condition: 'Az kullanılmış', fabric: 'Hakiki Deri', measurements: { shoulder: '48 cm', bust: '112 cm', sleeve: '65 cm', length: '70 cm' } },
  { id: 'prod-2', name: 'Özel Tasarım Abiye', price: 6500, category: 'Özel Tasarım', imageId: 'product-2', tailorId: 'zeynep-kaya', description: 'Tamamen el işlemesi, ipek şifon üzerine boncuk ve kristal detaylarla süslenmiş, tek omuzlu, A kesim abiye elbise. Mezuniyet ve özel davetler için tasarlandı.', brand: 'Moda Evi Zeynep', condition: 'Yeni gibi', fabric: 'İpek Şifon', measurements: { bust: '90 cm', waist: '72 cm', length: '155 cm' } },
  { id: 'prod-3', name: 'Pamuklu Yazlık Elbise', price: 450, category: 'İkinci El', imageId: 'product-3', tailorId: 'fatma-demir', description: 'Çiçek desenli, %100 pamuklu, nefes alan kumaştan, çok rahat bir yazlık elbise. Sadece birkaç kez giyildi, hiçbir kusuru yoktur.', brand: 'Bilindik Marka', condition: 'Yeni gibi', fabric: '%100 Pamuk', measurements: { bust: '95 cm', waist: '80 cm', length: '110 cm' } },
  { id: 'prod-4', name: 'İtalyan Kesim Gömlek', price: 1800, category: 'Özel Tasarım', imageId: 'product-4', tailorId: 'kenan-erkin', description: 'Mısır pamuğundan, bedene oturan kalıbıyla özel olarak dikilmiş erkek gömleği. Manşetlere isteğe bağlı monogram işlenebilir.', brand: 'Gömlek Atölyesi', condition: 'Yeni gibi', fabric: 'Mısır Pamuğu', measurements: { shoulder: '46 cm', sleeve: '66 cm', waist: '100 cm' } },
  { id: 'prod-5', name: 'Marka Kot Pantolon', price: 500, category: 'İkinci El', imageId: 'product-5', tailorId: 'ahmet-yilmaz', description: 'Çok az kullanılmış, eskitme detaylı, boru paça kot pantolon. Rengi ve dokusu ilk günkü gibidir.', brand: 'Bilindik Marka', condition: 'Az kullanılmış', fabric: 'Denim', measurements: { waist: '84 cm', hip: '102 cm', length: '105 cm' } },
  { id: 'prod-6', name: 'Kız Çocuk Kostümü', price: 900, category: 'Özel Tasarım', imageId: 'product-6', tailorId: 'sibel-canan', description: 'Elsa temalı, tül ve saten kumaşlardan yapılmış, el işlemesi kar tanesi detaylı kostüm. 5-6 yaş için uygundur.', brand: 'Sibelin Çocuk Dünyası', condition: 'Yeni gibi', fabric: 'Saten ve Tül', measurements: { bust: '60 cm', length: '90 cm' } },
  // ... more products
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
