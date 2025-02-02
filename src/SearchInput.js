const TEMPLATE = '<input type="text">';

class SearchInput {
  constructor({ $target, onSearch }) {
    const $searchInput = document.createElement('input');
    this.$searchInput = $searchInput;
    this.$searchInput.placeholder = '고양이를 검색해보세요.|';

    $searchInput.className = 'SearchInput';
    $target.appendChild($searchInput);

    $searchInput.addEventListener('keyup', async (e) => {
      if (e.key === 'Enter') {
        await onSearch(e.target.value);
      }
    });

    $searchInput.addEventListener('click', async (e) => {
      if ($searchInput.value) {
        $searchInput.value = '';
      }
    });

    // 페이지 진입 시 포커스
    this.$searchInput.focus();
    console.log('SearchInput created.', this);
  }

  render() {}
}
