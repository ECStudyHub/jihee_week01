const TEMPLATE = '<input type="text">';

class SearchInput {
  isPageLoaded = false;
  isInputFocused = false;
  lastSearched = null;
  searchedKeywords = [];
  onSearch = null;

  constructor({ $target, onSearch }) {
    this.onSearch = onSearch;
    this.lastSearched = localStorage.getItem('lastSearched') || '';

    const $searchSection = document.createElement('section');
    this.$searchSection = $searchSection;
    $searchSection.className = 'SearchSection';

    const $searchInput = document.createElement('input');
    this.$searchInput = $searchInput;
    this.$searchInput.placeholder = '고양이를 검색해보세요.|';
    $searchInput.className = 'SearchInput';

    const $searchKeywords = document.createElement('div');
    this.$searchKeywords = $searchKeywords;
    $searchKeywords.className = 'SearchKeywords';

    $searchSection.appendChild($searchInput);
    $searchSection.appendChild($searchKeywords);
    $target.appendChild($searchSection);

    $searchInput.addEventListener('keyup', async (e) => {
      if (e.key === 'Enter') {
        const keyword = e.target.value;
        $searchInput.value = '';

        this.searchedKeywords = this.searchedKeywords.filter((keyword) => keyword !== e.target.value);
        this.searchedKeywords.push(keyword);
        if (this.searchedKeywords.length > 5) {
          this.searchedKeywords.shift();
        }
        console.log('this.searchedKeywords:', this.searchedKeywords);

        // 마지막 검색어 저장
        localStorage.setItem('lastSearched', keyword);

        this.render();
        await this.onSearch(keyword);
      }
    });

    $searchInput.addEventListener('click', async (e) => {
      if ($searchInput.value) {
        $searchInput.value = '';
      }
    });

    $searchInput.addEventListener('focus', async (e) => {
      if (!this.isInputFocused) {
        this.isInputFocused = true;
        this.render();
      }
    });

    // 페이지 진입 시 포커스
    if (!this.isPageLoaded) {
      this.$searchInput.focus();
    }
    console.log('SearchInput created.', this);
  }

  render() {
    // 페이지 로드시 마지막 검색어로 검색 실행
    if (!this.isPageLoaded && this.lastSearched) {
      this.$searchInput.value = this.lastSearched;
      this.onSearch(this.lastSearched);
      this.isPageLoaded = true;
    }

    if (this.isInputFocused) {
      this.$searchKeywords.innerHTML = this.searchedKeywords.map((keyword) => `<div class="keyword-item">${keyword}</div>`).join('');

      this.$searchKeywords.querySelectorAll('.keyword-item').forEach(($item) => {
        $item.addEventListener('click', async () => {
          console.log('Clicked:', $item.textContent);
          await this.onSearch($item.textContent);
        });
      });

      this.$searchKeywords.classList.add('visible');
    } else {
      this.$searchKeywords.classList.remove('visible');
    }
  }
}
