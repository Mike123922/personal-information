# 个人展示平台 H5

> 一个现代简约、移动端优先的个人展示页面，纯 HTML / CSS / JS 实现，无需构建。

## 📁 文件结构

```
portfolio-h5/
├── index.html       # 主页面（所有内容都在这里）
├── styles.css       # 样式
├── script.js        # 交互逻辑
└── README.md        # 本文件
```

## 🚀 怎么打开

**方式 1：直接双击 `index.html`**
最简单的办法，浏览器直接打开即可。

**方式 2：本地服务器（推荐，刷新体验更好）**

```bash
# 进入项目目录
cd "D:\personal information\portfolio-h5"

# Python 3 自带服务器
python -m http.server 8080

# 或者 Node.js
npx serve .
```

然后浏览器打开 http://localhost:8080

## ✏️ 怎么填入你的信息

页面里所有 **带蓝色虚线下划线的占位** 都是你要填的地方。鼠标悬停时会高亮，方便定位。

只需要打开 `index.html`，搜索 `[ 你的` 或 `data-fill`，把里面的占位文字替换成你的真实信息即可。

### 主要填入项速查

| 板块 | 填什么 | 在哪里 |
|------|--------|--------|
| Hero 头像 | 你的头像图片（推荐 400×400） | `<img>` 替换 `.hero__avatar-img` 内的占位 |
| 姓名 | 你的真实姓名 | 全文搜索 `[ 你的名字 ]` |
| 岗位方向 | 例：Web Developer / AI Engineer | `.hero__role-text` |
| 学校/专业 | 例：上海杉达学院 · 计科 | `.hero__school` |
| 关于我 | 个人故事 | `.about__text` 两个 `<p>` |
| 标签 | 例：算法 / 前端 / 折腾者 | `.about__tags li` |
| 教育时间线 | 课程 / 时间 | `.timeline__item` |
| 技能 | 名称 + 熟练度（0-100） | `.skill`（注意 `data-fill` 是百分比数字） |
| 项目 | 名称 / 描述 / 标签 / 链接 | `.project` 卡片 |
| 联系 | 邮箱 / GitHub / 微信 | `.cta__socials` |

### 进阶：换头像

找到这一段：
```html
<div class="hero__avatar-img">
  <span class="avatar-placeholder">[ 头像 ]</span>
</div>
```

替换为：
```html
<div class="hero__avatar-img">
  <img src="./assets/avatar.jpg" alt="你的名字" />
</div>
```

记得把头像文件放到 `portfolio-h5/assets/avatar.jpg`。

## 🎨 怎么改风格

打开 `styles.css`，顶部 `:root` 里集中了所有设计变量：

```css
--c-primary: #2563eb;      /* 主色调，想换色直接改这里 */
--c-primary-2: #3b82f6;    /* 渐变辅色 */
--c-primary-soft: #dbeafe; /* 浅色背景 */
```

换一种主色（比如紫色 `7c3aed`），整个页面瞬间变样。

## 📦 怎么部署

部署到公网让别人也能看？最简单的方式：

1. **EdgeOne Pages / Vercel / Netlify**：直接拖拽文件夹上去，自动生成链接
2. **GitHub Pages**：推到 GitHub 仓库，开启 Pages 即可
3. **对象存储 + CDN**：把整个文件夹传到 COS / OSS，绑定域名

## 💡 小提示

- 想加新板块？复制现有 `.section`，照葫芦画瓢即可
- 想加更多项目？复制 `.project` 卡片粘贴
- 想换字体？改 `styles.css` 里 `--f-base` 的 `font-family`
- 移动端友好，断点设在 720px 和 480px

---

Built by you. ✨