class Media {
  private _url: string = '';
  private _title: string = '';
  private _group: string = '';
  private _album: string = '';
  private _artworkUrl: string = '';

  get title() {
    return this._title;
  }
}

export default Media;
