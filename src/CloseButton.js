class CloseButton {
  constructor({ $target, onClick }) {
    this.$closeButton = document.createElement('div');
    this.$closeButton.className = 'close';
    this.$closeButton.innerText = 'x';

    $target.appendChild(this.$closeButton);

    /** 모달 닫힘: close 버튼을 누를 경우 */
    this.$closeButton.addEventListener('click', onClick);

    /** 모달 닫힘: 키보드 esc를 누를 경우 */
    const onKeyDown = async (e) => {
      if (e.key === 'Escape') await onClick(e);
    };
    window.addEventListener('keydown', onKeyDown);
  }
  render() {}
}
