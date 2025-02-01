import Story from './components/Story';

function App() {
  const stories = [
    {
      type: 'message',
      title: 'Sevgilim',
      message:
        'Seninle geçirdiğim her an için şanslıyım. Bu özel günde seninle olan anılarımızı paylaşmak istiyorum...',
    },
    {
      type: 'photo',
      image: '/images/ilk-bulusma.jpg',
      title: 'İlk Buluşmamız',
      date: '14 Şubat 2023',
      description:
        'O gün hayatımın en güzel günlerinden biri olacağını bilmiyordum...',
    },
    {
      type: 'memory',
      title: 'İlk İzlediğimiz Film',
      date: '20 Şubat 2023',
      icon: '🎬',
      image: '/images/ilk-film.jpg',
      movie: 'La La Land',
      description:
        'Sinemada yan yana oturup, aynı anları paylaştığımız ilk film. Patlamış mısırı paylaşırken gizlice sana bakıyordum.',
      location: 'Cinemaximum',
    },
    {
      type: 'memory',
      title: 'İlk Kahve Molası',
      date: '1 Mart 2023',
      icon: '☕',
      image: '/images/ilk-cafe.jpg',
      place: 'Starbucks',
      description:
        'Sen sıcak çikolata, ben americano... Saatlerce konuşup birbirimizi tanıdığımız o güzel öğleden sonra.',
      order: 'Senin: Sıcak Çikolata\nBenim: Americano',
    },
    {
      type: 'photo',
      image: '/images/ilk-tatil.jpg',
      title: 'İlk Tatilimiz',
      date: '15 Temmuz 2023',
      description:
        'Birlikte çıktığımız ilk tatil, unutulmaz anılarla doluydu...',
    },
    {
      type: 'memory',
      title: 'İlk Yemek Denemem',
      date: '5 Ağustos 2023',
      icon: '🍝',
      dish: 'Makarna Carbonara',
      description:
        'Senin için ilk kez yemek yapmaya çalıştığımda mutfağı dağıtmıştım. Ama sen yine de gülümseyerek "Çok güzel olmuş" dedin.',
      result: 'Biraz tuzlu olmuştu 😅',
    },
    {
      type: 'music',
      songs: [
        {
          title: 'Medcezir',
          artist: 'Levent Yüksel',
          albumCover: '/images/album1.jpg',
        },
        {
          title: 'Perfect',
          artist: 'Ed Sheeran',
          albumCover: '/images/album2.jpg',
        },
      ],
    },
    {
      type: 'memory',
      title: 'İlk Sürprizin',
      date: '15 Eylül 2023',
      icon: '🎁',
      image: '/images/ilk-albüm.jpg',
      gift: 'El Yapımı Albüm',
      description:
        'Doğum günümde bana hazırladığın o el yapımı albüm... Her sayfasında farklı bir anımız, her köşesinde ayrı bir mutluluk vardı.',
      reaction: 'Gözlerim dolmuştu 🥺',
    },
    {
      type: 'memory',
      title: 'İlk Dans',
      date: '31 Aralık 2023',
      icon: '💃',
      image: '/images/ilk-dans.jpg',
      song: 'Perfect - Ed Sheeran',
      description:
        'Yılbaşı partisinde, herkesin içinde ilk dansımız. O an dünya durmuş, sadece biz vardık.',
      moment: 'Slow müzik başladığında kulağıma fısıldadığın o söz...',
    },
    {
      type: 'memory',
      title: 'Gizli Notlar',
      date: '5 Ocak 2024',
      icon: '💌',
      description:
        'Çantama, ceplerime gizlice bıraktığın o minik aşk notları... Her birini hala saklıyorum.',
      notes: [
        '"Bugün çok güzelsin ❤️"',
        '"Seni her gün daha çok seviyorum"',
        '"Sen benim en güzel şansımsın"',
      ],
      reaction: 'Her notu bulduğumda kalbim küt küt atıyor 💕',
    },
    {
      type: 'memory',
      title: 'Doğum Günün',
      date: '20 Ocak 2024',
      icon: '✨',
      image: '/images/ilk-dogum.jpg',

      description:
        'Gece yarısı sahilde yıldızları izlerken kurduğumuz hayaller... Seninle yaşlanmak, bir ömür el ele yürümek...',
      dreams: [
        'Birlikte dünya turu yapmak',
        'Sahilde küçük bir evimiz olsun',
        'Her akşam gün batımını izlemek',
      ],
      moment: 'Başını omzuma yasladığında zamanın durmasını diledim...',
    },
    {
      type: 'memory',
      title: 'Küçük Sürprizler',
      date: '1 Şubat 2024',
      icon: '🎁',
      description:
        'En sıradan günleri bile özel kılan o minik sürprizlerin... Ofisime bıraktığın çikolata, masama koyduğun not, ansızın gönderdiğin çiçekler...',
      surprises: [
        'Favori çikolatam',
        'El yapımı origami kalpler',
        'Mini polaroid fotoğraflarımız',
      ],
      feeling: 'Her sürprizinde ilk günkü gibi kalbim çarpıyor 💝',
    },
    {
      type: 'memory',
      title: 'Bizim Yerimiz',
      date: '10 Şubat 2024',
      icon: '🌟',
      image: '/images/gizli-yer.jpg',
      place: 'Gizli Köşemiz',
      description:
        'Sadece ikimizin bildiği o özel yer... Her gittiğimizde aynı banka oturup, aynı manzarayı izleyip, geleceğimizi hayal ediyoruz.',
      rituals: [
        'Yanında getirdiğin sıcak kahveler',
        'Paylaştığımız kurabiyeler',
        'Cebinde her zaman olan polaroid kameran',
      ],
      promise: 'Burası sonsuza dek bizim yerimiz kalacak...',
    },
    {
      type: 'message',
      title: 'Seni Seviyorum',
      message: `Her geçen gün sana olan sevgim daha da derinleşiyor... 
      Seninle yaşadığım her an, her anı benim için paha biçilemez. 
      Sen benim en güzel şansım, en tatlı tesadüfüm, en değerli varlığımsın. 
      Seninle geçireceğimiz daha nice güzel anılar için sabırsızlanıyorum. 
      Seni çok seviyorum, iyi ki varsın... ❤️`,
    },
  ];

  return (
    <div className="min-h-screen bg-black">
      <Story stories={stories} />
    </div>
  );
}

export default App;
