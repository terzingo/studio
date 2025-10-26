import type { Tailor } from './types';
import { PlaceHolderImages } from './placeholder-images';

const mockTailors: Tailor[] = [
  {
    id: 'ahmet-yilmaz',
    name: 'Ahmet Yılmaz',
    specialty: 'Erkek Giyim ve Takım Elbise',
    location: 'İstanbul, Beşiktaş',
    rating: 4.9,
    reviews: 124,
    imageId: 'tailor-1',
    portfolioImageIds: ['portfolio-2', 'portfolio-9', 'portfolio-6'],
    bio: '20 yıllık tecrübemle, klasik ve modern erkek giyiminde kişiye özel çözümler sunuyorum. Kumaş seçiminden son dikişe kadar her detayda kaliteyi ön planda tutuyorum.',
    services: [
      { name: 'Özel Dikim Takım Elbise', price: '₺8000' },
      { name: 'Gömlek Dikimi', price: '₺1500' },
      { name: 'Pantolon Paça Tadilatı', price: '₺250' },
    ],
    customerReviews: [
        { id: 'rev1', name: 'Can B.', rating: 5, comment: 'Ahmet Bey işinin ehli. Takım elbisem tam istediğim gibi oldu.', date: '12.05.2024' },
        { id: 'rev2', name: 'Selim K.', rating: 5, comment: 'Hızlı ve kaliteli hizmet. Kesinlikle tavsiye ederim.', date: '01.04.2024' }
    ]
  },
  {
    id: 'zeynep-kaya',
    name: 'Zeynep Kaya',
    specialty: 'Kadın Giyim ve Abiye',
    location: 'Ankara, Çankaya',
    rating: 5.0,
    reviews: 98,
    imageId: 'tailor-2',
    portfolioImageIds: ['portfolio-1', 'portfolio-3', 'portfolio-8'],
    bio: 'Moda tasarımı mezunuyum ve 10 yıldır kendi atölyemde hizmet veriyorum. Özellikle gelinlik ve abiye tasarımlarında iddialıyım. Hayallerinizdeki elbiseyi birlikte tasarlayalım.',
    services: [
      { name: 'Özel Dikim Gelinlik', price: '₺15000' },
      { name: 'Abiye Elbise Dikimi', price: '₺7000' },
      { name: 'Elbise Tadilatı', price: '₺500' },
    ],
    customerReviews: [
        { id: 'rev3', name: 'Ebru S.', rating: 5, comment: 'Zeynep Hanım harikalar yarattı! Gelinliğim tam bir rüya gibiydi.', date: '20.06.2024' },
        { id: 'rev4', name: 'Demet A.', rating: 5, comment: 'İlgisi ve yeteneği inanılmaz. Herkese tavsiye ederim.', date: '15.05.2024' }
    ]
  },
  {
    id: 'mustafa-ozen',
    name: 'Mustafa Özen',
    specialty: 'Deri Ceket ve Vintage Giyim',
    location: 'İzmir, Konak',
    rating: 4.8,
    reviews: 75,
    imageId: 'tailor-3',
    portfolioImageIds: ['portfolio-4', 'portfolio-5', 'portfolio-7'],
    bio: 'Deri ve vintage parçalara olan tutkumu mesleğime dönüştürdüm. Eskiyen ceketlerinizi onarıyor, bedeninize göre ayarlıyor veya sıfırdan size özel tasarımlar yapıyorum.',
    services: [
      { name: 'Özel Dikim Deri Ceket', price: '₺6000' },
      { name: 'Vintage Ceket Onarımı', price: '₺1000' },
      { name: 'Kot Pantolon Daraltma', price: '₺300' },
    ],
    customerReviews: [
        { id: 'rev5', name: 'Ozan T.', rating: 5, comment: 'Mustafa Usta deriyi konuşturuyor. Ceketim yeniden doğmuş gibi oldu.', date: '05.06.2024' }
    ]
  },
  {
    id: 'fatma-demir',
    name: 'Fatma Demir',
    specialty: 'Günlük Giyim ve Tadilat',
    location: 'Bursa, Nilüfer',
    rating: 4.7,
    reviews: 210,
    imageId: 'tailor-4',
    portfolioImageIds: ['portfolio-6', 'portfolio-7', 'portfolio-8'],
    bio: 'Her türlü tadilat işleriniz için güvenilir adresiniz. Hızlı, temiz ve uygun fiyatlı hizmet sunuyorum. Günlük kıyafetlerinizi bedeninize en uygun hale getiriyorum.',
    services: [
      { name: 'Fermuar Değişimi', price: '₺150' },
      { name: 'Elbise Boyu Kısaltma', price: '₺200' },
      { name: 'Beden Daraltma', price: '₺400' },
    ],
    customerReviews: [
        { id: 'rev6', name: 'Ayşe G.', rating: 4, comment: 'Fatma Hanım çok hızlı ve işini iyi yapıyor. Fiyatları da makul.', date: '18.06.2024' }
    ]
  },
    {
    id: 'kenan-erkin',
    name: 'Kenan Erkin',
    specialty: 'Bespoke Gömlek Uzmanı',
    location: 'İstanbul, Kadıköy',
    rating: 4.9,
    reviews: 88,
    imageId: 'tailor-5',
    portfolioImageIds: ['portfolio-6', 'portfolio-9'],
    bio: 'Sadece size özel, bedeninize mükemmel oturan gömlekler tasarlıyorum. Yüzlerce kumaş seçeneği ve kişiselleştirme detayları ile tarzınızı yansıtın.',
    services: [
      { name: 'Özel Dikim Gömlek (Mısır Pamuğu)', price: '₺2500' },
      { name: 'Monogram İşleme', price: '₺200' },
      { name: 'Manşet ve Yaka Değişimi', price: '₺400' },
    ],
    customerReviews: [
        { id: 'rev7', name: 'Barış A.', rating: 5, comment: 'Gömleklerim hiç bu kadar iyi olmamıştı. Kenan Bey gerçekten bir sanatçı.', date: '25.05.2024' }
    ]
  },
  {
    id: 'sibel-canan',
    name: 'Sibel Canan',
    specialty: 'Çocuk Giyimi',
    location: 'Antalya, Muratpaşa',
    rating: 4.8,
    reviews: 65,
    imageId: 'tailor-6',
    portfolioImageIds: ['portfolio-8'],
    bio: 'Çocuklarınız için hem rahat hem de şık kıyafetler tasarlıyorum. Sağlıklı kumaşlar kullanarak, onların hassas cildine uygun, özel günler veya günlük kullanım için harika elbiseler dikiyorum.',
    services: [
      { name: 'Özel Dikim Çocuk Elbisesi', price: '₺1200' },
      { name: 'Okul Üniforması Tadilatı', price: '₺150' },
      { name: 'Kostüm Dikimi', price: '₺1500' },
    ],
    customerReviews: [
        { id: 'rev8', name: 'Pelin V.', rating: 5, comment: 'Kızımın doğum günü elbisesi harika oldu. Sibel Hanım çok yetenekli.', date: '02.06.2024' }
    ]
  }
];

export function getTailors(): Tailor[] {
  return mockTailors.map(tailor => {
    const image = PlaceHolderImages.find(img => img.id === tailor.imageId);
    const portfolio = tailor.portfolioImageIds.map(id => PlaceHolderImages.find(img => img.id === id)).filter(Boolean);
    
    return {
      ...tailor,
    }
  });
}

export function getTailorById(id: string): Tailor | undefined {
  const tailor = mockTailors.find(t => t.id === id);
  if (!tailor) return undefined;

  const image = PlaceHolderImages.find(img => img.id === tailor.imageId);
  const portfolio = tailor.portfolioImageIds.map(pId => PlaceHolderImages.find(img => img.id === pId)).filter(Boolean);

  return {
    ...tailor,
  }
}
