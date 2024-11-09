chrome.webNavigation.onBeforeNavigate.addListener(
  function(details) {
    const url = new URL(details.url);
    
    if ((url.hostname === 'www.figma.com' || url.hostname === 'figma.com') && 
        !url.pathname.includes('plugin-sandbox')) { // プラグイン開発環境へのリダイレクトを防ぐ
      if (!url.searchParams.has('m')) {
        url.searchParams.append('m', 'dev');
        chrome.tabs.update(details.tabId, {
          url: url.toString()
        });
      }
    }
  },
  {
    url: [{
      hostEquals: 'www.figma.com'
    }, {
      hostEquals: 'figma.com'
    }]
  }
);
