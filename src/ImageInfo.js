class ImageInfo {
  $imageInfo = null;
  data = null;

  constructor({ $target, data }) {
    const $imageInfo = document.createElement('section');
    $imageInfo.className = 'ImageInfo';
    this.$imageInfo = $imageInfo;
    $target.appendChild($imageInfo);

    this.data = data;

    this.render();
  }

  setState(nextData) {
    this.data = nextData;
    this.render();
  }

  /** 모달 닫힘: close 버튼을 누르거나, 키보드 esc를 누를 경우 */
  closeModal(e) {
    this.setState({ visible: false });
    this.render();
  }

  render() {
    if (this.data.visible) {
      const { name, url, temperament, origin } = this.data.image;

      this.$imageInfo.innerHTML = `
        <div class="content-wrapper">
          <div class="title">
            <span>${name}</span>
          </div>
          <img src="${url}" alt="${name}"/>        
          <div class="description">
            <div>성격: ${temperament}</div>
            <div>태생: ${origin}</div>
          </div>
        </div>`;

      new CloseButton({
        $target: this.$imageInfo.querySelector('.title'),
        onClick: (e) => this.closeModal(e),
      });

      this.$imageInfo.classList.add('visible');
    } else {
      this.$imageInfo.classList.remove('visible');
    }
  }
}
