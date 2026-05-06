<script setup lang="ts">
import { ref, watch } from 'vue'
import { 
  Menu, X, ChevronRight, Sparkles, Heart, Star, Cloud, Ghost
} from 'lucide-vue-next'
import { PROJECTS, BLOG_POSTS, type BlogPost } from './data'

const darkMode = ref(false)
const mobileMenuOpen = ref(false)
const selectedPost = ref<BlogPost | null>(null)
const activeTab = ref('home')

const toggleDarkMode = () => {
  darkMode.value = !darkMode.value
}

watch(darkMode, (val) => {
  if (val) {
    document.documentElement.classList.add('dark')
  } else {
    document.documentElement.classList.remove('dark')
  }
}, { immediate: true })

const tabs = [
  { id: 'home', label: '首页', labelEn: 'Home' },
  { id: 'projects', label: '作品', labelEn: 'Works' },
  { id: 'blog', label: '日志', labelEn: 'Logs' },
  { id: 'about', label: '关于', labelEn: 'Intell' },
]

const setActiveTab = (tabId: string) => {
  activeTab.value = tabId
}

const openPost = (post: BlogPost) => {
  selectedPost.value = post
}

const closePost = () => {
  selectedPost.value = null
}
</script>

<template>
  <div class="min-h-screen selection:bg-ani-pink/30 flex flex-col relative overflow-x-hidden">
    <!-- Decorative Components -->
    <div class="fixed inset-0 pointer-events-none overflow-hidden z-0">
      <div class="floating-element top-[15%] left-[5%]" :style="{ animationDelay: '0s' }"><Heart class="text-ani-pink" :size="40" /></div>
      <div class="floating-element top-[60%] left-[8%]" :style="{ animationDelay: '1s' }"><Star class="text-ani-yellow" :size="30" /></div>
      <div class="floating-element top-[20%] right-[10%]" :style="{ animationDelay: '2s' }"><Cloud class="text-ani-blue" :size="50" /></div>
      <div class="floating-element top-[75%] right-[15%]" :style="{ animationDelay: '0.5s' }"><Sparkles class="text-ani-purple" :size="35" /></div>
    </div>
    
    <!-- Navigation -->
    <nav class="sticky top-4 mx-4 md:mx-auto max-w-5xl w-[calc(100%-2rem)] z-50 ani-glass rounded-full px-6 py-3 shadow-xl shadow-ani-pink/10 border border-white/40 dark:border-white/10">
      <div class="flex items-center justify-between">
        <button @click="setActiveTab('home')" class="flex items-center gap-4 group">
          <div class="relative group">
            <div class="absolute -inset-2 bg-gradient-to-r from-ani-pink to-ani-purple rounded-full opacity-0 group-hover:opacity-100 transition-opacity blur-md" />
            <div class="relative w-12 h-12 bg-white dark:bg-ani-dark rounded-2xl flex items-center justify-center shadow-lg border-2 border-ani-pink/20 overflow-hidden">
               <img 
                 src="https://api.dicebear.com/7.x/adventurer/svg?seed=Miao&backgroundColor=ff85a1&flip=true" 
                 alt="Mascot" 
                 class="w-10 h-10 object-contain"
                 referrerPolicy="no-referrer"
               />
               <div class="absolute top-0 right-0 w-4 h-4 bg-ani-yellow -translate-y-1/2 translate-x-1/2 rotate-45" />
            </div>
          </div>
          <span class="font-black text-xl tracking-tight text-zinc-900 dark:text-white">小柒.Studio</span>
        </button>

        <!-- Desktop Nav -->
        <div class="hidden md:flex items-center gap-1">
          <nav class="flex items-center gap-1">
            <button 
              v-for="tab in tabs"
              :key="tab.id" 
              @click="setActiveTab(tab.id)"
              class="text-sm font-bold px-5 py-2 rounded-full transition-all relative"
              :class="activeTab === tab.id ? 'text-white' : 'text-zinc-500 hover:text-ani-pink'"
            >
              <span class="relative z-10">{{ tab.label }}</span>
              <div 
                v-if="activeTab === tab.id"
                class="absolute inset-0 bg-gradient-to-r from-ani-pink to-ani-purple rounded-full shadow-lg shadow-ani-pink/30 animate-in fade-in zoom-in duration-300" 
              />
            </button>
          </nav>
          <div class="flex items-center gap-4 ml-6 pl-6 border-l border-zinc-200 dark:border-white/10">
            <button 
              @click="toggleDarkMode"
              class="w-12 h-6 bg-zinc-200 dark:bg-zinc-800 rounded-full relative transition-all"
              aria-label="Toggle theme"
            >
              <div class="absolute top-1 w-4 h-4 rounded-full transition-all flex items-center justify-center" 
                   :class="darkMode ? 'right-1 bg-ani-purple' : 'left-1 bg-ani-yellow shadow-sm'">
                <Ghost v-if="darkMode" :size="10" class="text-white" />
                <Star v-else :size="10" class="text-white fill-white" />
              </div>
            </button>
          </div>
        </div>

        <button class="md:hidden p-2 text-ani-pink" @click="mobileMenuOpen = true">
          <Menu :size="28" />
        </button>
      </div>
    </nav>

    <!-- Mobile Menu -->
    <Transition
      enter-active-class="transition duration-300 ease-out"
      enter-from-class="opacity-0 scale-95"
      enter-to-class="opacity-100 scale-100"
      leave-active-class="transition duration-200 ease-in"
      leave-from-class="opacity-100 scale-100"
      leave-to-class="opacity-0 scale-95"
    >
      <div 
        v-if="mobileMenuOpen"
        class="fixed inset-0 z-[60] ani-glass p-8 flex flex-col items-center justify-center gap-8"
      >
        <button class="absolute top-8 right-8 p-2 text-ani-pink" @click="mobileMenuOpen = false">
          <X :size="32" />
        </button>
        <button 
          v-for="tab in tabs"
          :key="tab.id" 
          @click="setActiveTab(tab.id); mobileMenuOpen = false;"
          class="text-4xl font-black transition-colors"
          :class="activeTab === tab.id ? 'text-ani-pink' : 'text-zinc-400'"
        >
          {{ tab.label }}
        </button>
      </div>
    </Transition>

    <main class="flex-grow flex flex-col z-10">
      <Transition mode="out-in" 
        enter-active-class="transition duration-500 ease-out"
        enter-from-class="opacity-0 translate-y-4"
        enter-to-class="opacity-100 translate-y-0"
        leave-active-class="transition duration-300 ease-in"
        leave-from-class="opacity-100 translate-y-0"
        leave-to-class="opacity-0 -translate-y-4"
      >
        <!-- Home Section -->
        <div
          v-if="activeTab === 'home'"
          key="home"
          class="flex-grow flex flex-col justify-center items-center py-20 px-6 text-center"
        >
          <div class="relative mb-12 animate-bounce-slow">
            <div class="absolute -inset-4 bg-ani-pink/20 rounded-full blur-2xl animate-pulse" />
            <div class="relative w-40 h-40 md:w-56 md:h-56 bg-white dark:bg-ani-dark rounded-[3rem] border-4 border-ani-pink p-2 shadow-2xl flex items-center justify-center overflow-hidden">
               <Ghost :size="100" class="text-ani-pink" />
            </div>
          </div>
          
          <span class="ani-label justify-center">Quality Guard & Automation Wizard</span>
          <h1 class="text-5xl md:text-8xl font-black tracking-tighter mb-8 leading-tight text-zinc-900 dark:text-white">
            你好，我是<span class="shimmer-text">小柒</span><br/>
            <span class="text-ani-blue">探索品质之美</span>
          </h1>
          
          <p class="text-lg md:text-xl text-zinc-500 font-medium max-w-2xl mx-auto mb-12">
            我在做测试，也在用 AI 重新理解软件开发。<br class="hidden md:block" />
            这里记录我的项目、博客和实验，重点关注软件测试、AI 工具和实际产品实现。
          </p>
          
          <div class="flex flex-wrap gap-6 justify-center">
            <button @click="setActiveTab('projects')" class="ani-btn-primary">进入传送门 / WORKS</button>
            <button @click="setActiveTab('about')" class="ani-btn-outline">角色情报 / ABOUT</button>
          </div>
        </div>

        <!-- Projects Section -->
        <div
          v-else-if="activeTab === 'projects'"
          key="projects"
          class="container-custom py-20"
        >
          <div class="mb-12 relative">
            <span class="ani-label">Protocols Delivered</span>
            <h2 class="text-4xl md:text-5xl font-black tracking-tight mt-2 flex items-center gap-4">
              <span class="shimmer-text text-zinc-900 dark:text-white">我的实验室</span>
              <div class="h-2 flex-grow bg-ani-pink/10 rounded-full" />
            </h2>
          </div>
          <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div v-for="(project, idx) in PROJECTS" :key="project.id" class="ani-card group">
              <div class="h-40 bg-gradient-to-br from-ani-pink/10 to-ani-purple/10 rounded-2xl mb-6 flex items-center justify-center relative overflow-hidden">
                <div class="absolute top-2 left-2 ani-tag opacity-0 group-hover:opacity-100 transition-opacity">PROJ_0{{ idx + 1 }}</div>
                <Sparkles class="text-ani-pink group-hover:scale-125 transition-transform" :size="48" />
              </div>
              <div class="space-y-4 text-left">
                <div class="flex flex-wrap gap-2">
                  <span v-for="tag in project.tags" :key="tag" class="ani-tag">{{ tag }}</span>
                </div>
                <h3 class="text-2xl font-black text-zinc-900 dark:text-white">{{ project.title }}</h3>
                <p class="text-zinc-500 text-sm leading-relaxed line-clamp-3">{{ project.description }}</p>
                <div class="flex gap-4 pt-4">
                  <a :href="project.link" target="_blank" class="flex-grow py-2 bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 text-center font-bold text-xs rounded-xl hover:bg-ani-pink transition-colors">GITHUB</a>
                  <button class="p-2 border-2 border-zinc-100 dark:border-white/10 rounded-xl hover:text-ani-pink transition-colors"><ChevronRight :size="20" /></button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Blog Section -->
        <div
          v-else-if="activeTab === 'blog'"
          key="blog"
          class="container-custom py-20"
        >
          <div class="mb-12 relative">
            <span class="ani-label">Transmission Logs</span>
            <h2 class="text-4xl md:text-5xl font-black tracking-tight mt-2 flex items-center gap-4">
              <span class="shimmer-text text-zinc-900 dark:text-white">研究日志</span>
              <div class="h-2 flex-grow bg-ani-pink/10 rounded-full" />
            </h2>
          </div>
          <div class="grid gap-6 max-w-4xl mx-auto">
            <div v-for="post in BLOG_POSTS" :key="post.id" class="ani-card group cursor-pointer flex gap-6 items-center p-4 md:p-6" @click="openPost(post)">
              <div class="w-20 h-20 bg-ani-pink/5 rounded-2xl flex-shrink-0 flex flex-col items-center justify-center font-black">
                <span class="text-xs text-ani-pink">{{ post.date.split('-')[1] }}</span>
                <span class="text-2xl text-ani-pink leading-none">{{ post.date.split('-')[2] }}</span>
              </div>
              <div class="flex-grow text-left">
                <div class="flex items-center gap-3 mb-1">
                  <span class="ani-tag !py-0.5 !text-[10px]">{{ post.readTime }}</span>
                  <h3 class="text-xl font-bold tracking-tight text-zinc-900 dark:text-white group-hover:text-ani-pink transition-colors">{{ post.title }}</h3>
                </div>
                <p class="text-zinc-500 text-sm line-clamp-1 italic">{{ post.excerpt }}</p>
              </div>
              <ChevronRight class="text-zinc-300 group-hover:text-ani-pink transition-all group-hover:translate-x-2" />
            </div>
          </div>
        </div>

        <!-- About Section -->
        <div
          v-else-if="activeTab === 'about'"
          key="about"
          class="container-custom py-20"
        >
          <div class="grid md:grid-cols-12 gap-12 text-left">
            <div class="md:col-span-12">
              <div class="mb-12 relative">
                <span class="ani-label">Agent Profile</span>
                <h2 class="text-4xl md:text-5xl font-black tracking-tight mt-2 flex items-center gap-4">
                  <span class="shimmer-text text-zinc-900 dark:text-white">数据档案</span>
                  <div class="h-2 flex-grow bg-ani-pink/10 rounded-full" />
                </h2>
              </div>
            </div>
            <div class="md:col-span-8">
              <div class="ani-card overflow-hidden">
                <div class="flex items-center gap-8 mb-10 pb-10 border-b border-zinc-100 dark:border-white/5">
                  <div class="relative">
                    <div class="absolute -inset-2 bg-ani-pink/10 rounded-full blur-xl" />
                    <div class="w-24 h-24 bg-gradient-to-br from-ani-pink to-ani-purple rounded-[2rem] flex items-center justify-center shadow-xl overflow-hidden p-2">
                       <img 
                        src="https://api.dicebear.com/7.x/adventurer/svg?seed=Miao&flip=true" 
                        alt="Operator" 
                        class="w-full h-full object-contain"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                  </div>
                  <div>
                    <h2 class="text-3xl font-black tracking-tight text-zinc-900 dark:text-white mb-2">OPERATOR: 小柒</h2>
                    <div class="flex flex-wrap gap-3">
                      <span class="px-3 py-1 bg-ani-pink/10 text-ani-pink text-xs font-bold rounded-lg border border-ani-pink/20">Lv.2026 Intern</span>
                      <span class="px-3 py-1 bg-ani-blue/10 text-ani-blue text-xs font-bold rounded-lg border border-ani-blue/20">Guangzhou, CN</span>
                    </div>
                  </div>
                </div>
                <div class="space-y-6 text-zinc-500 font-medium text-lg leading-relaxed mb-10">
                  <p>专注于软件质量工程，梦想是用 AI 的火花照亮繁琐的日常测试工作。我不仅是个程序员，还是个不折不扣的二次元爱好者 ✨</p>
                  <p>擅长利用各类自动化框架构建质量防线，把每一个 BUG 都当作是需要进化的领主。欢迎在技术的星辰大海中与我偶遇！</p>
                </div>
                <div class="flex flex-wrap gap-4">
                  <a href="mailto:example@email.com" class="ani-btn-primary">建立通讯枢纽</a>
                  <a 
                    href="https://github.com/Camellia0422" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    class="ani-btn-outline flex items-center gap-2"
                  >
                    GitHub 传送门
                  </a>
                </div>
              </div>
            </div>
            <div class="md:col-span-4 space-y-6">
              <div class="ani-card !bg-ani-pink/5 !border-ani-pink/10">
                <span class="ani-label mb-4 block">Loadout / 技能组</span>
                <div class="space-y-4">
                  <div v-for="skill in ['Java', 'Python', 'React', 'Docker', 'Playwright']" :key="skill" class="flex justify-between items-center bg-white dark:bg-zinc-900 p-3 rounded-2xl shadow-sm border border-zinc-100 dark:border-white/5">
                    <span class="font-bold text-sm text-zinc-900 dark:text-white">{{ skill }}</span>
                    <div class="flex gap-1">
                      <div v-for="i in 4" :key="i" class="w-2 h-2 rounded-full" :class="i < 4 ? 'bg-ani-pink' : 'bg-zinc-200 dark:bg-zinc-700'" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Transition>
    </main>

    <footer class="py-8 px-6 text-center z-10">
      <div class="max-w-xl mx-auto ani-glass rounded-[2rem] p-6 flex flex-col md:flex-row justify-between items-center gap-4">
        <p class="text-xs font-bold text-zinc-400 uppercase tracking-widest">© 2026 小柒 // Pure Hearts & Solid Code</p>
        <div class="flex gap-6">
          <a href="https://github.com/Camellia0422" target="_blank" rel="noopener noreferrer" class="text-ani-pink hover:scale-110 transition-transform"><Ghost :size="20" /></a>
          <a href="#" class="text-ani-pink hover:scale-110 transition-transform"><Sparkles :size="20" /></a>
        </div>
      </div>
    </footer>

    <!-- Blog Modal -->
    <Transition
      enter-active-class="transition duration-300 ease-out"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition duration-200 ease-in"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div v-if="selectedPost" class="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-10">
        <div 
          class="absolute inset-0 bg-white/40 dark:bg-black/40 backdrop-blur-md"
          @click="closePost"
        />
        <div
          class="relative w-full max-w-3xl max-h-[85vh] ani-glass rounded-[3rem] shadow-2xl flex flex-col overflow-hidden border-4 border-ani-pink/20 animate-in zoom-in-95 duration-300"
        >
          <div class="p-6 border-b border-zinc-100 dark:border-white/5 flex justify-between items-center">
            <span class="ani-label mb-0">Decryption Success: {{ selectedPost.id }}</span>
            <button @click="closePost" class="p-2 bg-ani-pink/10 text-ani-pink rounded-full hover:bg-ani-pink hover:text-white transition-colors"><X :size="20" /></button>
          </div>
          <div class="overflow-y-auto p-10 md:p-20 text-left">
            <div class="flex gap-4 mb-6">
              <span class="ani-tag font-mono">{{ selectedPost.date }}</span>
              <span class="ani-tag bg-ani-purple/10 text-ani-purple border-ani-purple/10">{{ selectedPost.readTime }}</span>
            </div>
            <h2 class="text-4xl md:text-5xl font-black tracking-tight mb-12 leading-tight text-zinc-900 dark:text-white underline decoration-ani-pink/30 decoration-8 underline-offset-8">
              {{ selectedPost.title }}
            </h2>
            <div class="prose dark:prose-invert max-w-none text-zinc-600 dark:text-zinc-300 font-medium">
              <template v-for="(line, i) in selectedPost.content.split('\n')" :key="i">
                <template v-if="line.trim()">
                  <h3 v-if="line.trim().startsWith('###')" class="text-2xl font-black mt-12 mb-6 text-ani-purple flex items-center gap-3">
                    <Sparkles :size="20" /> {{ line.trim().replace('### ', '') }}
                  </h3>
                  <p v-else class="leading-relaxed mb-6 text-lg">{{ line.trim() }}</p>
                </template>
              </template>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </div>
</template>
