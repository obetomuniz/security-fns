export function addXFrameOptionsHeader(): void {
  if (window.top !== window.self) {
    window?.top.location.href = window.self.location.href
  }
}
