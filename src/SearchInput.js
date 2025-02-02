const TEMPLATE = '<input type="text">';

class SearchInput {
  isPageLoaded = false;
  isInputFocused = false;
  searchedKeywords = [];
  onSearch = null;

  constructor({ $target, onSearch }) {
    this.onSearch = onSearch;

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
      this.isInputFocused = false;
      this.render();

      if (e.key === 'Enter') {
        this.searchedKeywords = this.searchedKeywords.filter((keyword) => keyword !== e.target.value);
        this.searchedKeywords.push(e.target.value);
        if (this.searchedKeywords.length > 5) {
          this.searchedKeywords.shift();
        }
        console.log('this.searchedKeywords:', this.searchedKeywords);
        await this.onSearch(e.target.value);
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
      this.isPageLoaded = true;
    }
    console.log('SearchInput created.', this);
  }

  render() {
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
