import { useState, useEffect, ReactNode } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Menu, X, ChevronRight, Sparkles, Heart, Star, Cloud, Ghost
} from 'lucide-react';
import { PROJECTS, BLOG_POSTS, Project, BlogPost } from './data';

// --- Decorative Components ---

const FloatingIcons = () => (
  <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
    <div className="floating-element top-[15%] left-[5%]" style={{ animationDelay: '0s' }}><Heart className="text-ani-pink" size={40} /></div>
    <div className="floating-element top-[60%] left-[8%]" style={{ animationDelay: '1s' }}><Star className="text-ani-yellow" size={30} /></div>
    <div className="floating-element top-[20%] right-[10%]" style={{ animationDelay: '2s' }}><Cloud className="text-ani-blue" size={50} /></div>
    <div className="floating-element top-[75%] right-[15%]" style={{ animationDelay: '0.5s' }}><Sparkles className="text-ani-purple" size={35} /></div>
  </div>
);

const Logo = () => (
  <div className="relative group">
    <div className="absolute -inset-2 bg-gradient-to-r from-ani-pink to-ani-purple rounded-full opacity-0 group-hover:opacity-100 transition-opacity blur-md" />
    <div className="relative w-12 h-12 bg-white dark:bg-ani-dark rounded-2xl flex items-center justify-center shadow-lg border-2 border-ani-pink/20 overflow-hidden">
       <img 
         src="https://api.dicebear.com/7.x/adventurer/svg?seed=Miao&backgroundColor=ff85a1&flip=true" 
         alt="Mascot" 
         className="w-10 h-10 object-contain"
         referrerPolicy="no-referrer"
       />
       <div className="absolute top-0 right-0 w-4 h-4 bg-ani-yellow -translate-y-1/2 translate-x-1/2 rotate-45" />
    </div>
  </div>
);

const SectionHeading = ({ children, subtitle }: { children: ReactNode; subtitle?: string }) => (
  <div className="mb-12 relative">
    <span className="ani-label">{subtitle}</span>
    <h2 className="text-4xl md:text-5xl font-black tracking-tight mt-2 flex items-center gap-4">
      <span className="shimmer-text">{children}</span>
      <div className="h-2 flex-grow bg-ani-pink/10 rounded-full" />
    </h2>
  </div>
);

export default function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
  const [activeTab, setActiveTab] = useState('home');

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const toggleDarkMode = () => setDarkMode(!darkMode);

  const tabs = [
    { id: 'home', label: '首页', labelEn: 'Home' },
    { id: 'projects', label: '作品', labelEn: 'Works' },
    { id: 'blog', label: '日志', labelEn: 'Logs' },
    { id: 'about', label: '关于', labelEn: 'Intell' },
  ];

  return (
    <div className="min-h-screen selection:bg-ani-pink/30 flex flex-col relative overflow-x-hidden">
      <FloatingIcons />
      
      {/* Navigation */}
      <nav className="sticky top-4 mx-4 md:mx-auto max-w-5xl w-[calc(100%-2rem)] z-50 ani-glass rounded-full px-6 py-3 shadow-xl shadow-ani-pink/10 border border-white/40 dark:border-white/10">
        <div className="flex items-center justify-between">
          <button onClick={() => setActiveTab('home')} className="flex items-center gap-4 group">
            <Logo />
            <span className="font-black text-xl tracking-tight text-zinc-900 dark:text-white">小柒.Studio</span>
          </button>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-1">
            <nav className="flex items-center gap-1">
              {tabs.map((tab) => (
                <button 
                  key={tab.id} 
                  onClick={() => setActiveTab(tab.id)}
                  className={`text-sm font-bold px-5 py-2 rounded-full transition-all relative ${
                    activeTab === tab.id 
                      ? 'text-white' 
                      : 'text-zinc-500 hover:text-ani-pink'
                  }`}
                >
                  <span className="relative z-10">{tab.label}</span>
                  {activeTab === tab.id && (
                    <motion.div 
                      layoutId="tab-bg" 
                      className="absolute inset-0 bg-gradient-to-r from-ani-pink to-ani-purple rounded-full shadow-lg shadow-ani-pink/30" 
                    />
                  )}
                </button>
              ))}
            </nav>
            <div className="flex items-center gap-4 ml-6 pl-6 border-l border-zinc-200 dark:border-white/10">
              <button 
                onClick={toggleDarkMode}
                className="w-12 h-6 bg-zinc-200 dark:bg-zinc-800 rounded-full relative transition-all"
                aria-label="Toggle theme"
              >
                <div className={`absolute top-1 w-4 h-4 rounded-full transition-all flex items-center justify-center ${darkMode ? 'right-1 bg-ani-purple' : 'left-1 bg-ani-yellow shadow-sm'}`}>
                  {darkMode ? <Ghost size={10} className="text-white" /> : <Star size={10} className="text-white fill-white" />}
                </div>
              </button>
            </div>
          </div>

          <button className="md:hidden p-2 text-ani-pink" onClick={() => setMobileMenuOpen(true)}>
            <Menu size={28} />
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="fixed inset-0 z-[60] ani-glass p-8 flex flex-col items-center justify-center gap-8"
          >
            <button className="absolute top-8 right-8 p-2 text-ani-pink" onClick={() => setMobileMenuOpen(false)}>
              <X size={32} />
            </button>
            {tabs.map((tab, idx) => (
              <button 
                key={tab.id} 
                onClick={() => { setActiveTab(tab.id); setMobileMenuOpen(false); }}
                className={`text-4xl font-black transition-colors ${activeTab === tab.id ? 'text-ani-pink' : 'text-zinc-400'}`}
              >
                {tab.label}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <main className="flex-grow flex flex-col z-10">
        <AnimatePresence mode="wait">
          {activeTab === 'home' && (
            <motion.div
              key="home"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="flex-grow flex flex-col justify-center items-center py-20 px-6 text-center"
            >
              <div className="relative mb-12 animate-bounce-slow">
                <div className="absolute -inset-4 bg-ani-pink/20 rounded-full blur-2xl animate-pulse" />
                <div className="relative w-40 h-40 md:w-56 md:h-56 bg-white dark:bg-ani-dark rounded-[3rem] border-4 border-ani-pink p-2 shadow-2xl flex items-center justify-center overflow-hidden">
                   <Ghost size={100} className="text-ani-pink" />
                </div>
              </div>
              
              <span className="ani-label justify-center">Quality Guard & Automation Wizard</span>
              <h1 className="text-5xl md:text-8xl font-black tracking-tighter mb-8 leading-tight">
                你好，我是<span className="shimmer-text">小柒</span><br/>
                <span className="text-ani-blue">探索品质之美</span>
              </h1>
              
              <p className="text-lg md:text-xl text-zinc-500 font-medium max-w-2xl mx-auto mb-12">
                我在做测试，也在用 AI 重新理解软件开发。<br className="hidden md:block" />
                这里记录我的项目、博客和实验，重点关注软件测试、AI 工具和实际产品实现。
              </p>
              
              <div className="flex flex-wrap gap-6 justify-center">
                <button onClick={() => setActiveTab('projects')} className="ani-btn-primary">进入传送门 / WORKS</button>
                <button onClick={() => setActiveTab('about')} className="ani-btn-outline">角色情报 / ABOUT</button>
              </div>
            </motion.div>
          )}

          {activeTab === 'projects' && (
            <motion.div
              key="projects"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="container-custom py-20"
            >
              <SectionHeading subtitle="Protocols Delivered">我的实验室</SectionHeading>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {PROJECTS.map((project, idx) => (
                  <div key={project.id} className="ani-card group">
                    <div className="h-40 bg-gradient-to-br from-ani-pink/10 to-ani-purple/10 rounded-2xl mb-6 flex items-center justify-center relative overflow-hidden">
                      <div className="absolute top-2 left-2 ani-tag opacity-0 group-hover:opacity-100 transition-opacity">PROJ_0{idx + 1}</div>
                      <Sparkles className="text-ani-pink group-hover:scale-125 transition-transform" size={48} />
                    </div>
                    <div className="space-y-4">
                      <div className="flex flex-wrap gap-2">
                        {project.tags.map(tag => (
                          <span key={tag} className="ani-tag">{tag}</span>
                        ))}
                      </div>
                      <h3 className="text-2xl font-black text-zinc-900 dark:text-white">{project.title}</h3>
                      <p className="text-zinc-500 text-sm leading-relaxed line-clamp-3">{project.description}</p>
                      <div className="flex gap-4 pt-4">
                        <a href={project.link} className="flex-grow py-2 bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 text-center font-bold text-xs rounded-xl hover:bg-ani-pink transition-colors">GITHUB</a>
                        <button className="p-2 border-2 border-zinc-100 dark:border-white/10 rounded-xl hover:text-ani-pink transition-colors"><ChevronRight size={20} /></button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {activeTab === 'blog' && (
            <motion.div
              key="blog"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="container-custom py-20"
            >
              <SectionHeading subtitle="Transmission Logs">研究日志</SectionHeading>
              <div className="grid gap-6 max-w-4xl mx-auto">
                {BLOG_POSTS.map((post) => (
                  <div key={post.id} className="ani-card group cursor-pointer flex gap-6 items-center p-4 md:p-6" onClick={() => setSelectedPost(post)}>
                    <div className="w-20 h-20 bg-ani-pink/5 rounded-2xl flex-shrink-0 flex flex-col items-center justify-center font-black">
                      <span className="text-xs text-ani-pink">{post.date.split('-')[1]}</span>
                      <span className="text-2xl text-ani-pink leading-none">{post.date.split('-')[2]}</span>
                    </div>
                    <div className="flex-grow">
                      <div className="flex items-center gap-3 mb-1">
                        <span className="ani-tag !py-0.5 !text-[10px]">{post.readTime}</span>
                        <h3 className="text-xl font-bold tracking-tight text-zinc-900 dark:text-white group-hover:text-ani-pink transition-colors">{post.title}</h3>
                      </div>
                      <p className="text-zinc-500 text-sm line-clamp-1 italic">{post.excerpt}</p>
                    </div>
                    <ChevronRight className="text-zinc-300 group-hover:text-ani-pink transition-all group-hover:translate-x-2" />
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {activeTab === 'about' && (
            <motion.div
              key="about"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.02 }}
              className="container-custom py-20"
            >
              <div className="grid md:grid-cols-12 gap-12">
                <div className="md:col-span-12">
                  <SectionHeading subtitle="Agent Profile">数据档案</SectionHeading>
                </div>
                <div className="md:col-span-8">
                  <div className="ani-card overflow-hidden">
                    <div className="flex items-center gap-8 mb-10 pb-10 border-b border-zinc-100 dark:border-white/5">
                      <div className="relative">
                        <div className="absolute -inset-2 bg-ani-pink/10 rounded-full blur-xl" />
                        <div className="w-24 h-24 bg-gradient-to-br from-ani-pink to-ani-purple rounded-[2rem] flex items-center justify-center shadow-xl overflow-hidden p-2">
                           <img 
                            src="https://api.dicebear.com/7.x/adventurer/svg?seed=Miao&flip=true" 
                            alt="Operator" 
                            className="w-full h-full object-contain"
                            referrerPolicy="no-referrer"
                          />
                        </div>
                      </div>
                      <div>
                        <h2 className="text-3xl font-black tracking-tight dark:text-white mb-2">OPERATOR: 小柒</h2>
                        <div className="flex flex-wrap gap-3">
                          <span className="px-3 py-1 bg-ani-pink/10 text-ani-pink text-xs font-bold rounded-lg border border-ani-pink/20">Lv.2026 Intern</span>
                          <span className="px-3 py-1 bg-ani-blue/10 text-ani-blue text-xs font-bold rounded-lg border border-ani-blue/20">Guangzhou, CN</span>
                        </div>
                      </div>
                    </div>
                    <div className="space-y-6 text-zinc-500 font-medium text-lg leading-relaxed mb-10">
                      <p>专注于软件质量工程，梦想是用 AI 的火花照亮繁琐的日常测试工作。我不仅是个程序员，还是个不折不扣的二次元爱好者 ✨</p>
                      <p>擅长利用各类自动化框架构建质量防线，把每一个 BUG 都当作是需要进化的领主。欢迎在技术的星辰大海中与我偶遇！</p>
                    </div>
                    <div className="flex flex-wrap gap-4">
                      <a href="mailto:example@email.com" className="ani-btn-primary">建立通讯枢纽</a>
                      <a 
                        href="https://github.com/Camellia0422" 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="ani-btn-outline flex items-center gap-2"
                      >
                        GitHub 传送门
                      </a>
                    </div>
                  </div>
                </div>
                <div className="md:col-span-4 space-y-6">
                  <div className="ani-card !bg-ani-pink/5 !border-ani-pink/10">
                    <span className="ani-label mb-4 block">Loadout / 技能组</span>
                    <div className="space-y-4">
                      {['Java', 'Python', 'Gemini', 'Docker', 'Playwright'].map(skill => (
                        <div key={skill} className="flex justify-between items-center bg-white dark:bg-zinc-900 p-3 rounded-2xl shadow-sm border border-zinc-100 dark:border-white/5">
                          <span className="font-bold text-sm">{skill}</span>
                          <div className="flex gap-1">
                            {[1,2,3,4].map(i => <div key={i} className={`w-2 h-2 rounded-full ${i < 4 ? 'bg-ani-pink' : 'bg-zinc-200 dark:bg-zinc-700'}`} />)}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <footer className="py-8 px-6 text-center z-10">
        <div className="max-w-xl mx-auto ani-glass rounded-[2rem] p-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs font-bold text-zinc-400 uppercase tracking-widest">© 2026 小柒 // Pure Hearts & Solid Code</p>
          <div className="flex gap-6">
            <a href="https://github.com/Camellia0422" target="_blank" rel="noopener noreferrer" className="text-ani-pink hover:scale-110 transition-transform"><Ghost size={20} /></a>
            <a href="#" className="text-ani-pink hover:scale-110 transition-transform"><Sparkles size={20} /></a>
          </div>
        </div>
      </footer>

      {/* Blog Modal */}
      <AnimatePresence>
        {selectedPost && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-10">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-white/40 dark:bg-black/40 backdrop-blur-md"
              onClick={() => setSelectedPost(null)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 40 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 40 }}
              className="relative w-full max-w-3xl max-h-[85vh] ani-glass rounded-[3rem] shadow-2xl flex flex-col overflow-hidden border-4 border-ani-pink/20"
            >
              <div className="p-6 border-b border-zinc-100 dark:border-white/5 flex justify-between items-center">
                <span className="ani-label mb-0">Decryption Success: {selectedPost.id}</span>
                <button onClick={() => setSelectedPost(null)} className="p-2 bg-ani-pink/10 text-ani-pink rounded-full hover:bg-ani-pink hover:text-white transition-colors"><X size={20} /></button>
              </div>
              <div className="overflow-y-auto p-10 md:p-20">
                <div className="flex gap-4 mb-6">
                  <span className="ani-tag font-mono">{selectedPost.date}</span>
                  <span className="ani-tag bg-ani-purple/10 text-ani-purple border-ani-purple/10">{selectedPost.readTime}</span>
                </div>
                <h2 className="text-4xl md:text-5xl font-black tracking-tight mb-12 leading-tight dark:text-white underline decoration-ani-pink/30 decoration-8 underline-offset-8">
                  {selectedPost.title}
                </h2>
                <div className="prose dark:prose-invert max-w-none text-zinc-600 dark:text-zinc-300 font-medium">
                  {selectedPost.content.split('\n').map((line, i) => {
                    const trimmed = line.trim();
                    if (!trimmed) return null;
                    if (trimmed.startsWith('###')) return (
                      <h3 key={i} className="text-2xl font-black mt-12 mb-6 text-ani-purple flex items-center gap-3">
                        <Sparkles size={20} /> {trimmed.replace('### ', '')}
                      </h3>
                    );
                    return <p key={i} className="leading-relaxed mb-6 text-lg">{trimmed}</p>;
                  })}
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
