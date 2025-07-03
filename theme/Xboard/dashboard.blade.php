<!doctype html>
<html lang="zh-CN">

<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width,initial-scale=1,maximum-scale=1,minimum-scale=1,user-scalable=no" />
  <title>布丁云加速器 - 高速稳定的网络加速服务 | VPN代理 | 游戏加速器</title>
  <meta name="description" content="布丁云加速器提供高速稳定的网络加速服务，支持全球节点，智能路由优化，保障您的网络隐私安全。专业的VPN代理服务，助您畅享全球互联网。" />
  <meta name="keywords" content="布丁云加速器,网络加速,VPN代理,游戏加速器,高速VPN,稳定加速器,全球节点,网络安全,隐私保护,智能路由,Steam加速器,Netflix解锁,YouTube加速,Instagram访问,Facebook解锁,Discord加速,原神加速器,英雄联盟加速,绝地求生加速,和平精英加速,学生VPN推荐,海外华人VPN,远程办公VPN,企业VPN解决方案,留学生网络加速,程序员VPN推荐" />
  <meta name="robots" content="index,follow" />
  <meta name="author" content="布丁云加速器" />
  <meta name="language" content="zh-CN" />
  <meta name="geo.region" content="CN" />
  <meta name="geo.country" content="China" />
  
  <!-- Open Graph / Facebook -->
  <meta property="og:type" content="website" />
  <meta property="og:url" content="{{ config('app.url') }}" />
  <meta property="og:title" content="布丁云加速器 - 高速稳定的网络加速服务 | VPN代理" />
  <meta property="og:description" content="布丁云加速器提供高速稳定的网络加速服务，支持全球节点，智能路由优化，保障您的网络隐私安全。" />
  <meta property="og:image" content="{{ config('app.url') }}/favicon.ico" />
  <meta property="og:site_name" content="布丁云加速器" />
  <meta property="og:locale" content="zh_CN" />
  
  <!-- Twitter -->
  <meta property="twitter:card" content="summary_large_image" />
  <meta property="twitter:url" content="{{ config('app.url') }}" />
  <meta property="twitter:title" content="布丁云加速器 - 高速稳定的网络加速服务 | VPN代理" />
  <meta property="twitter:description" content="布丁云加速器提供高速稳定的网络加速服务，支持全球节点，智能路由优化，保障您的网络隐私安全。" />
  <meta property="twitter:image" content="{{ config('app.url') }}/favicon.ico" />
  
  <!-- 结构化数据 -->
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "布丁云加速器",
    "url": "{{url('/')}}",
    "logo": "{{url('/')}}/theme/{{$theme}}/assets/favicon.webp",
    "description": "专业游戏加速器和VPN服务提供商",
    "sameAs": [
      "https://t.me/pudingcloud"
    ],
    "contactPoint": {
      "@type": "ContactPoint",
      "contactType": "customer service",
      "availableLanguage": ["Chinese", "English"]
    },
    "offers": {
      "@type": "Offer",
      "description": "VPN和游戏加速服务",
      "category": "网络服务"
    }
  }
  </script>
  
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "布丁云加速器",
    "url": "{{url('/')}}",
    "description": "专业游戏加速器和VPN服务",
    "potentialAction": {
      "@type": "SearchAction",
      "target": "{{url('/')}}?q={search_term_string}",
      "query-input": "required name=search_term_string"
    }
  }
  </script>
  <script type="module" crossorigin src="/theme/{{$theme}}/assets/umi.js"></script>
</head>

<body>

  <script>
    window.routerBase = "/";
    window.settings = {
      title: '{{$title}}',
      assets_path: '/theme/{{$theme}}/assets',
      theme: {
        color: '{{ $theme_config['theme_color'] ?? "default" }}',
      },
      version: '{{$version}}',
      background_url: '{{$theme_config['background_url']}}',
      description: '{{$description}}',
      i18n: [
        'zh-CN',
        'en-US',
        'ja-JP',
        'vi-VN',
        'ko-KR',
        'zh-TW',
        'fa-IR'
      ],
      logo: '{{$logo}}'
    }
  </script>
  <div id="app"></div>
  {!! $theme_config['custom_html'] !!}
</body>

</html>