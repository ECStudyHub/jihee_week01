class SearchResult {
  $searchResult = null;
  isListLoading = false;
  data = null;
  onClick = null;

  constructor({ $target, isListLoading, initialData, onClick }) {
    this.$searchResult = document.createElement('section');
    this.$searchResult.className = 'SearchResult';
    $target.appendChild(this.$searchResult);

    this.isListLoading = isListLoading;
    this.data = initialData;
    this.onClick = onClick;

    this.render();
  }

  setState({ data: nextData, isListLoading: nextIsListLoading }) {
    if (nextData !== undefined) {
      this.data = nextData;
    }
    if (nextIsListLoading !== undefined) {
      this.isListLoading = nextIsListLoading;
    }
    this.render();
  }

  render() {
    if (this.isListLoading) {
      this.$searchResult.innerHTML = `<div>로딩중</div>`;
    } else if (this.data?.length === 0) {
      this.$searchResult.innerHTML = `<div>검색 결과 목록이 비어있습니다.</div>`;
    } else {
      this.$searchResult.innerHTML = this.data
        .map(
          (cat) => `
          <div class="item">
            <img src=${cat.url} alt=${cat.name} />
          </div>
        `
        )
        .join('');

      this.$searchResult.querySelectorAll('.item').forEach(($item, index) => {
        $item.addEventListener('click', async () => {
          this.onClick(this.data[index]);
        });
      });
    }
  }
}
