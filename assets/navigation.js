// 북촌을잇다 공통 네비게이션
function createNavigation(currentLang = 'kr') {
  // 현재 페이지의 경로를 기반으로 상대 경로 결정
  const currentPath = window.location.pathname;
  const isSubPage = currentPath.includes('/en/') || 
                   currentPath.includes('/fr/') || 
                   currentPath.includes('/jp/') || 
                   currentPath.includes('/ch/');
  
  // 로컬 파일 시스템에서도 작동하도록 상대 경로 사용
  const basePrefix = isSubPage ? '../' : './';
  
  const languages = [
    { code: 'kr', name: 'KR', path: basePrefix + 'index.html' },
    { code: 'en', name: 'EN', path: basePrefix + 'en/index.html' },
    { code: 'fr', name: 'FR', path: basePrefix + 'fr/index.html' },
    { code: 'jp', name: 'JP', path: basePrefix + 'jp/index.html' },
    { code: 'ch', name: 'CH', path: basePrefix + 'ch/index.html' }
  ];

  const mapPath = basePrefix + 'map.html';
  
  let navHTML = '<nav class="mt-8 p-4 bg-gray-50"><div class="flex flex-wrap justify-center gap-2">';
  
  // 모든 언어 버튼들 표시
  languages.forEach(lang => {
    if (lang.code === currentLang) {
      // 현재 페이지 버튼 (활성 상태)
      navHTML += `<button class="mx-1 px-4 py-2 bg-blue-600 text-white rounded font-medium shadow-sm cursor-default">${lang.name}</button>`;
    } else {
      // 다른 페이지 버튼 (비활성 상태)
      navHTML += `<a href="${lang.path}" class="mx-1 no-underline px-4 py-2 bg-gray-100 text-gray-700 rounded font-medium transition-colors duration-300 hover:bg-gray-200 hover:text-gray-900">${lang.name}</a>`;
    }
  });
  
  // 지도 버튼 추가
  if (currentLang === 'map') {
    // 현재 지도 페이지인 경우
    navHTML += `<button class="mx-1 px-4 py-2 bg-blue-600 text-white rounded font-medium shadow-sm cursor-default">📍 Map</button>`;
  } else {
    // 다른 페이지에서 지도 링크
    navHTML += `<a href="${mapPath}" class="mx-1 no-underline px-4 py-2 bg-gray-100 text-gray-700 rounded font-medium transition-colors duration-300 hover:bg-gray-200 hover:text-gray-900">📍 Map</a>`;
  }
  
  navHTML += '</div></nav>';
  
  return navHTML;
}

// 페이지 로드 시 네비게이션 생성
document.addEventListener('DOMContentLoaded', function() {
  const navContainer = document.getElementById('navigation');
  if (navContainer) {
    const currentLang = navContainer.getAttribute('data-current-lang') || 'kr';
    navContainer.innerHTML = createNavigation(currentLang);
  }
});