console.log('app is running!');

class App {
  $target = null;
  data = [];
  isListLoading = false;

  constructor($target) {
    this.$target = $target;

    this.searchInput = new SearchInput({
      $target,
      onSearch: async (keyword) => {
        this.setState({ isListLoading: true }); // 로딩 시작
        const { data } = await api.fetchCats(keyword);
        this.setState({ data, isListLoading: false }); // 로딩 끝
      },
    });

    this.searchResult = new SearchResult({
      $target,
      isListLoading: this.isListLoading,
      initialData: this.data,
      onClick: async (image) => {
        if (!image?.id) return;
        this.imageInfo.setState({
          data: { visible: true },
          isModalLoading: true,
        });
        const { data } = await api.getCatDetail(image.id);
        this.imageInfo.setState({
          data: {
            visible: true,
            image: data,
          },
          isModalLoading: false,
        });
      },
    });

    this.imageInfo = new ImageInfo({
      $target,
      data: {
        visible: false,
        image: null,
      },
    });
  }

  setState({ data: nextData, isListLoading: nextIsListLoading }) {
    console.log(this);
    if (nextData !== undefined) {
      this.data = nextData;
    }
    if (nextIsListLoading !== undefined) {
      this.isListLoading = nextIsListLoading;
      this.searchResult.setState({ isListLoading: nextIsListLoading });
    }
    if (nextData !== undefined && nextIsListLoading !== undefined) {
      this.searchResult.setState({ data: nextData, isListLoading: nextIsListLoading });
    }
  }
}
