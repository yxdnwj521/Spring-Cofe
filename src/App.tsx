import { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Leaf, Sun, Wind, Snowflake, Coffee, Utensils, Clock, MapPin, ChevronRight, Menu as MenuIcon, X } from 'lucide-react';

type Season = 'spring' | 'summer' | 'autumn' | 'winter';

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
}

const SEASON_DATA: Record<Season, {
  title: string;
  subtitle: string;
  description: string;
  heroImage: string;
  icon: any;
  products: Product[];
  accent: string;
}> = {
  spring: {
    title: "樱花与微风的午后",
    subtitle: "Spring in Ghibli Forest",
    description: "当第一缕春风吹过森林，樱花瓣如雪般飘落。在这个万物复苏的季节，来一杯带着花香的拿铁吧。",
    heroImage: "https://picsum.photos/seed/ghibli-spring/1200/800",
    icon: Leaf,
    accent: "bg-pink-200",
    products: [
      { id: 1, name: "樱落拿铁", description: "精选浅烘焙豆，融入自制樱花糖浆，顶部缀以盐渍樱花。", price: 38, image: "https://picsum.photos/seed/sakura-latte/400/400" },
      { id: 2, name: "草莓大福抹茶", description: "浓郁五十铃抹茶配上新鲜草莓果肉，层层递进的清新感。", price: 42, image: "https://picsum.photos/seed/strawberry-matcha/400/400" },
      { id: 3, name: "春之森三明治", description: "嫩芽生菜、烟熏三文鱼与柠檬奶油芝士的轻盈组合。", price: 45, image: "https://picsum.photos/seed/spring-sandwich/400/400" },
      { id: 4, name: "樱桃芝士蛋糕", description: "如云朵般绵密的口感，藏着整颗酒渍樱桃。", price: 48, image: "https://picsum.photos/seed/cherry-cake/400/400" },
      { id: 5, name: "薄荷苏打", description: "森林溪水般的清爽，点缀新鲜薄荷叶。", price: 32, image: "https://picsum.photos/seed/mint-soda/400/400" },
    ]
  },
  summer: {
    title: "蝉鸣与波光的盛夏",
    subtitle: "Summer in Ghibli Forest",
    description: "阳光穿透厚厚的云层，海风带来咸咸的味道。在最热的日子里，冰镇的果茶是森林里最好的慰藉。",
    heroImage: "https://picsum.photos/seed/ghibli-summer/1200/800",
    icon: Sun,
    accent: "bg-blue-200",
    products: [
      { id: 1, name: "天空之城冰滴", description: "历经8小时慢速萃取，口感干净，带有明亮的柑橘酸调。", price: 40, image: "https://picsum.photos/seed/iced-coffee/400/400" },
      { id: 2, name: "萤火虫柠檬茶", description: "手打香水柠檬，加入蝶豆花呈现如星空般的梦幻色彩。", price: 35, image: "https://picsum.photos/seed/lemon-tea/400/400" },
      { id: 3, name: "波妞西瓜冰", description: "新鲜西瓜汁与细腻刨冰，每一口都是夏天的味道。", price: 38, image: "https://picsum.photos/seed/watermelon-ice/400/400" },
      { id: 4, name: "向日葵芒果塔", description: "酥脆塔皮包裹香甜芒果肉，造型如盛开的向日葵。", price: 52, image: "https://picsum.photos/seed/mango-tart/400/400" },
      { id: 5, name: "冷萃白桃乌龙", description: "低迷的咖啡因，高昂的桃香，夏日午后的最佳伴侣。", price: 36, image: "https://picsum.photos/seed/peach-tea/400/400" },
    ]
  },
  autumn: {
    title: "落叶与麦香的深秋",
    subtitle: "Autumn in Ghibli Forest",
    description: "森林染上了金黄色，松鼠忙着收集松果。壁炉里升起暖意，南瓜与肉桂的香气在空气中弥漫。",
    heroImage: "https://picsum.photos/seed/ghibli-autumn/1200/800",
    icon: Wind,
    accent: "bg-orange-200",
    products: [
      { id: 1, name: "枫叶焦糖玛奇朵", description: "自制焦糖酱，拉花呈现精致枫叶形状，温暖醇厚。", price: 42, image: "https://picsum.photos/seed/caramel-coffee/400/400" },
      { id: 2, name: "南瓜肉桂拿铁", description: "秋季限定，南瓜泥与肉桂粉的经典碰撞，治愈感十足。", price: 45, image: "https://picsum.photos/seed/pumpkin-latte/400/400" },
      { id: 3, name: "栗子蒙布朗", description: "细腻的栗子泥如山峦般堆叠，内藏整颗糖渍栗子。", price: 55, image: "https://picsum.photos/seed/chestnut-cake/400/400" },
      { id: 4, name: "红薯巴斯克", description: "焦香的外皮下是软糯的红薯芯，口感丰富。", price: 48, image: "https://picsum.photos/seed/sweet-potato-cake/400/400" },
      { id: 5, name: "热苹果肉桂茶", description: "慢火熬煮的苹果片，散发着迷人的香料气息。", price: 38, image: "https://picsum.photos/seed/apple-tea/400/400" },
    ]
  },
  winter: {
    title: "炉火与初雪的冬夜",
    subtitle: "Winter in Ghibli Forest",
    description: "白雪覆盖了远山，世界变得安静。围坐在暖炉旁，捧着热气腾腾的杯子，听雪落下的声音。",
    heroImage: "https://picsum.photos/seed/ghibli-winter/1200/800",
    icon: Snowflake,
    accent: "bg-slate-200",
    products: [
      { id: 1, name: "煤球精灵黑巧", description: "70%黑巧克力融化而成，顶部点缀可爱的煤球精灵棉花糖。", price: 45, image: "https://picsum.photos/seed/hot-chocolate/400/400" },
      { id: 2, name: "姜饼拿铁", description: "微微的辛辣感驱散寒冷，配上一块手工姜饼人。", price: 42, image: "https://picsum.photos/seed/ginger-latte/400/400" },
      { id: 3, name: "草莓雪山蛋糕", description: "洁白的奶油如厚雪，红艳的草莓如冬日暖阳。", price: 58, image: "https://picsum.photos/seed/strawberry-snow/400/400" },
      { id: 4, name: "红酒烩梨", description: "香料红酒慢炖，梨肉晶莹剔透，暖胃又暖心。", price: 52, image: "https://picsum.photos/seed/mulled-wine-pear/400/400" },
      { id: 5, name: "维也纳咖啡", description: "浓郁黑咖啡顶着厚厚的冰奶油，冷与热的极致体验。", price: 40, image: "https://picsum.photos/seed/vienna-coffee/400/400" },
    ]
  }
};

export default function App() {
  const [season, setSeason] = useState<Season>('spring');
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const month = new Date().getMonth(); // 0-11
    if (month >= 2 && month <= 4) setSeason('spring');
    else if (month >= 5 && month <= 7) setSeason('summer');
    else if (month >= 8 && month <= 10) setSeason('autumn');
    else setSeason('winter');
  }, []);

  const currentData = useMemo(() => SEASON_DATA[season], [season]);

  const seasonIcons = [
    { id: 'spring', icon: Leaf, label: '春' },
    { id: 'summer', icon: Sun, label: '夏' },
    { id: 'autumn', icon: Wind, label: '秋' },
    { id: 'winter', icon: Snowflake, label: '冬' },
  ];

  return (
    <div className={`min-h-screen theme-${season} overflow-x-hidden selection:bg-opacity-30 selection:bg-current`}>
      <div className="paper-texture" />
      
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 px-6 py-4 flex justify-between items-center backdrop-blur-md bg-white/30 border-b border-current/5">
        <div className="flex items-center gap-2">
          <motion.div 
            whileHover={{ rotate: 15 }}
            className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-lg border-2 border-current/10"
          >
            <Coffee className="w-6 h-6 text-current" />
          </motion.div>
          <span className="text-xl font-serif font-bold tracking-wider hidden sm:block">吉卜力之森咖啡馆</span>
        </div>

        <div className="flex items-center gap-4">
          <div className="hidden md:flex items-center bg-white/40 rounded-full p-1 border border-current/10 shadow-inner">
            {seasonIcons.map(({ id, icon: Icon, label }) => (
              <button
                key={id}
                onClick={() => setSeason(id as Season)}
                className={`flex items-center gap-1 px-4 py-1.5 rounded-full transition-all duration-500 ${
                  season === id ? 'bg-current text-white shadow-md' : 'hover:bg-white/50 text-current/60'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span className="text-sm font-bold">{label}</span>
              </button>
            ))}
          </div>
          
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="p-2 rounded-full bg-white/40 border border-current/10 md:hidden text-current"
          >
            {isMenuOpen ? <X /> : <MenuIcon />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            className="fixed inset-0 z-40 bg-white md:hidden p-10 flex flex-col gap-8 pt-24"
          >
            <h3 className="text-2xl font-serif font-bold border-b pb-4">切换季节</h3>
            <div className="grid grid-cols-2 gap-4">
              {seasonIcons.map(({ id, icon: Icon, label }) => (
                <button
                  key={id}
                  onClick={() => {
                    setSeason(id as Season);
                    setIsMenuOpen(false);
                  }}
                  className={`flex flex-col items-center gap-2 p-6 rounded-2xl border-2 transition-all ${
                    season === id ? 'border-current bg-current/5' : 'border-gray-100'
                  }`}
                >
                  <Icon className="w-8 h-8" />
                  <span className="font-bold">{label}天</span>
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center px-6 pt-20 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <AnimatePresence mode="wait">
            <motion.img
              key={season}
              src={currentData.heroImage}
              alt={season}
              initial={{ opacity: 0, scale: 1.1 }}
              animate={{ opacity: 0.4, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 1.5 }}
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </AnimatePresence>
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[var(--season-bg)]" />
        </div>

        <div className="relative z-10 max-w-4xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-1 rounded-full border border-current/30 mb-6"
          >
            <currentData.icon className="w-4 h-4 animate-pulse" />
            <span className="text-sm tracking-widest uppercase">{currentData.subtitle}</span>
          </motion.div>
          
          <motion.h1
            key={`title-${season}`}
            initial={{ opacity: 0, filter: 'blur(10px)' }}
            animate={{ opacity: 1, filter: 'blur(0px)' }}
            transition={{ duration: 1 }}
            className="text-5xl md:text-8xl font-serif font-bold mb-8 leading-tight"
          >
            {currentData.title}
          </motion.h1>

          <motion.p
            key={`desc-${season}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="text-lg md:text-xl max-w-2xl mx-auto opacity-80 leading-relaxed mb-10"
          >
            {currentData.description}
          </motion.p>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-4 rounded-full bg-current text-white font-bold shadow-xl hover:shadow-2xl transition-all flex items-center gap-2 mx-auto"
          >
            查看今日菜单 <ChevronRight className="w-5 h-5" />
          </motion.button>
        </div>

        {/* Decorative Floating Elements */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {[...Array(12)].map((_, i) => (
            <motion.div
              key={`${season}-deco-${i}`}
              initial={{ 
                x: Math.random() * 100 + '%', 
                y: -20, 
                opacity: 0,
                rotate: 0 
              }}
              animate={{ 
                y: '110vh', 
                opacity: [0, 1, 1, 0],
                rotate: 360,
                x: (Math.random() * 100 - 50) + '%'
              }}
              transition={{ 
                duration: 10 + Math.random() * 20, 
                repeat: Infinity, 
                delay: Math.random() * 10,
                ease: "linear"
              }}
              className="absolute text-current/20"
            >
              <currentData.icon size={20 + Math.random() * 20} />
            </motion.div>
          ))}
        </div>
      </section>

      {/* Menu Section */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div className="max-w-xl">
            <h2 className="text-4xl font-serif font-bold mb-4">季节限定风味</h2>
            <p className="opacity-70">我们根据自然的时钟，为您挑选当季最新鲜的食材，编织成森林里的诗篇。</p>
          </div>
          <div className="flex items-center gap-2 text-sm font-bold opacity-60">
            <Utensils className="w-4 h-4" />
            <span>SEASONAL MENU</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          <AnimatePresence mode="popLayout">
            {currentData.products.map((product, index) => (
              <motion.div
                key={`${season}-${product.id}`}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ delay: index * 0.1 }}
                className="group relative bg-[var(--season-card)] rounded-3xl p-6 ghibli-shadow hover:bg-white transition-all duration-500 ghibli-border overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-[var(--season-secondary)] opacity-20 rounded-bl-full -mr-10 -mt-10 transition-transform group-hover:scale-150" />
                
                <div className="aspect-square overflow-hidden rounded-2xl mb-6 relative z-10">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-sm font-bold shadow-sm text-[var(--season-text)]">
                    ¥{product.price}
                  </div>
                </div>
                <h3 className="text-2xl font-serif font-bold mb-2 relative z-10">{product.name}</h3>
                <p className="text-sm opacity-70 leading-relaxed mb-6 relative z-10">{product.description}</p>
                <button className="w-full py-3 rounded-xl border-2 border-current/20 font-bold hover:bg-current hover:text-white transition-colors relative z-10">
                  加入愿望单
                </button>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-24 px-6 bg-[var(--season-secondary)] bg-opacity-30 transition-colors duration-1000">
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          <div className="relative">
            <div className="absolute -top-10 -left-10 w-40 h-40 bg-current/10 rounded-full blur-3xl animate-pulse" />
            <img 
              src="https://picsum.photos/seed/ghibli-cafe-interior/800/1000" 
              alt="Cafe Interior" 
              className="rounded-3xl ghibli-shadow relative z-10 ghibli-border"
              referrerPolicy="no-referrer"
            />
            <div className="absolute -bottom-6 -right-6 bg-white p-6 rounded-2xl shadow-xl z-20 animate-float hidden md:block border-2 border-current/10">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-3 h-3 rounded-full bg-green-400" />
                <span className="text-xs font-bold opacity-50">OPENING HOURS</span>
              </div>
              <p className="font-serif font-bold text-lg text-[var(--season-text)]">10:00 AM - 08:00 PM</p>
            </div>
          </div>
          
          <div>
            <span className="text-xs font-bold tracking-widest opacity-50 uppercase mb-4 block">Our Story</span>
            <h2 className="text-4xl font-serif font-bold mb-8 leading-tight">在森林的深处，<br />藏着一个关于时间的秘密。</h2>
            <div className="space-y-6 opacity-80 leading-relaxed">
              <p>吉卜力之森咖啡馆不仅是一个品尝咖啡的地方，更是一个让灵魂歇脚的驿站。我们相信，每一杯咖啡都承载着大自然的呼吸。</p>
              <p>从春天的第一抹嫩绿，到冬天的最后一朵雪花，我们在这里守候着四季的轮转。这里的每一件家具都有它的故事，每一款甜点都藏着森林的低语。</p>
              <p>无论你是独自一人寻找灵感，还是与好友分享快乐，这里总有一盏灯为你而亮，有一份温暖为你而留。</p>
            </div>
            
            <div className="mt-12 grid grid-cols-2 gap-8">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-2xl bg-white/50 border border-current/10 shadow-sm"><MapPin className="w-6 h-6" /></div>
                <div>
                  <h4 className="font-bold mb-1">地址</h4>
                  <p className="text-sm opacity-60">森林之丘 1985号</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-2xl bg-white/50 border border-current/10 shadow-sm"><Clock className="w-6 h-6" /></div>
                <div>
                  <h4 className="font-bold mb-1">营业时间</h4>
                  <p className="text-sm opacity-60">周二至周日</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-16 px-6 border-t border-current/10 text-center">
        <div className="flex items-center justify-center gap-2 mb-8">
          <Coffee className="w-8 h-8" />
          <span className="text-2xl font-serif font-bold">吉卜力之森</span>
        </div>
        <p className="opacity-50 text-sm mb-8">© 2026 Ghibli Forest Café. Inspired by the magic of animation.</p>
        <div className="flex justify-center gap-6">
          {['Instagram', 'Twitter', 'Weibo'].map(social => (
            <a key={social} href="#" className="text-sm font-bold hover:underline opacity-70 hover:opacity-100 transition-all">{social}</a>
          ))}
        </div>
      </footer>
    </div>
  );
}
