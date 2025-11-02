import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PlaceHolderImages } from '@/lib/placeholder-images';

const teamMembers = [
  {
    name: 'Mali Danışman & İşletmeci',
    role: 'Finans Uzmanı',
    experience: '+20 Yıl',
    imageId: 'team-1'
  },
  {
    name: 'Usta Modelist & Tekstil İşletmeci',
    role: 'Usta Terzi',
    experience: '+20 Yıl',
    imageId: 'team-2'
  },
  {
    name: 'Usta Modelist & Üretim Müdürü',
    role: 'Usta Terzi',
    experience: '+20 Yıl',
    imageId: 'team-3'
  }
];

export default function AboutPage() {
  const aboutImage = PlaceHolderImages.find((img) => img.id === 'about-us');

  return (
    <div className="container mx-auto px-4 py-8 md:py-12 max-w-6xl">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold font-headline">Biz Kimiz?</h1>
        <p className="mt-4 text-lg text-muted-foreground max-w-3xl mx-auto">
          Terzin<span className="text-primary">Go</span>, e-ticaret ve geleneksel terzilik arasında köprü kuran, modayı teknolojiyle birleştiren yenilikçi bir girişimdir.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
        <div>
          {aboutImage && (
            <Image
              src={aboutImage.imageUrl}
              alt={aboutImage.description}
              width={600}
              height={600}
              className="rounded-lg shadow-xl"
              data-ai-hint={aboutImage.imageHint}
            />
          )}
        </div>
        <div className="space-y-6">
          <h2 className="text-3xl font-bold font-headline">Vizyonumuz</h2>
          <p className="text-muted-foreground text-lg">
            Online alışverişin en büyük sorunlarından biri olan "beden uyumsuzluğu" ve buna bağlı yüksek iade oranlarına kalıcı bir çözüm getirmek. Müşteri memnuniyetini en üst seviyeye çıkarırken, e-ticaret firmalarının operasyonel yükünü azaltmak ve yerel esnaf olan terzileri dijital ekonomiye kazandırmak en büyük hedefimiz.
          </p>
          <h2 className="text-3xl font-bold font-headline">Misyonumuz</h2>
          <p className="text-muted-foreground text-lg">
            Geliştirdiğimiz teknolojik altyapı ile müşterilere kusursuz bir tadilat deneyimi sunmak, e-ticaret ortaklarımıza verimli bir iade yönetim sistemi sağlamak ve Terzin<span className="text-primary">Go</span> noktası olan terzilere yeni bir gelir kapısı aralamak için çalışıyoruz.
          </p>
        </div>
      </div>
      
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold font-headline">Ekibimiz</h2>
        <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
          Yılların tecrübesini teknolojiyle birleştiren tutkulu bir ekibiz.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {teamMembers.map((member) => {
          const memberImage = PlaceHolderImages.find((img) => img.id === member.imageId);
          return (
            <Card key={member.name} className="text-center overflow-hidden">
              <CardHeader className="p-0 relative">
                {memberImage && (
                  <Image
                    src={memberImage.imageUrl}
                    alt={member.name}
                    width={400}
                    height={400}
                    className="object-cover w-full h-80"
                    data-ai-hint={memberImage.imageHint}
                  />
                )}
                <div className="absolute top-2 right-2 bg-primary text-primary-foreground text-xs font-bold px-2 py-1 rounded-full">{member.experience}</div>
              </CardHeader>
              <CardContent className="p-4">
                <CardTitle className="text-xl font-headline">{member.name}</CardTitle>
                <p className="text-muted-foreground mt-1">{member.role}</p>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}

    
