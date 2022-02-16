import { defineElement } from '@umbraco-ui/uui-base/lib/registration';
import { css, html, LitElement } from 'lit';
import { query, property } from 'lit/decorators.js';
import { UUIFileDropzoneEvent } from './UUIFileDropzoneEvents';
import { LabelMixin } from '@umbraco-ui/uui-base/lib/mixins';

/**
 * @element uui-file-dropzone
 *  @fires {UUIFileDropzoneEvent} file-drop - fires when the a file has been selected.
 *  @slot - For the content of the dropzone
 *  @description - Dropzone for file upload. Supports native browsing and drag n drop.
 */
@defineElement('uui-file-dropzone')
export class UUIFileDropzoneElement extends LabelMixin('', LitElement) {
  static styles = [
    css`
      #input,
      #input-label {
        position: absolute;
        width: 0px;
        height: 0px;
        opacity: 0;
        display: none;
      }
    `,
  ];

  /**
   * Allows for directories to be selected.
   * @type {boolean}
   * @attr
   * @default false
   */
  @property({ type: Boolean })
  directory = false;

  /**
   * Accepted filetypes. Will allow all types if empty.
   * @type {string}
   * @attr
   * @default false
   */
  @property({ type: String })
  accept = '';

  @query('#input')
  input!: HTMLInputElement;

  /**
   * Allows for directories to be selected.
   * @type {File[]}
   * @attr
   * @default []
   */
  @property({ attribute: false })
  files: File[] = [];

  /**
   * Allows for multiple files to be selected.
   * @type {boolean}
   * @attr
   * @default false
   */
  @property({ type: Boolean })
  multiple = false;

  constructor() {
    super();

    this.addEventListener('dragenter', this.onDragEnter, false);
    this.addEventListener('dragleave', this.onDragLeave, false);
    this.addEventListener('dragover', this.onDragOver, false);
    this.addEventListener('drop', this.onDrop, false);
    this.addEventListener('click', this.handleClick);
  }

  private handleClick(e: Event) {
    e.stopImmediatePropagation();
    this.openNativeInput();
  }

  protected checkIsItDirectory(dtItem: DataTransferItem): boolean {
    // @ts-ignore TODO: fix typescript error
    return !dtItem.type ? dtItem.webkitGetAsEntry().isDirectory : false;
  }

  // Drop handler function to get all files
  private async getAllFileEntries(dataTransferItemList: DataTransferItemList) {
    const fileEntries: FileSystemFileEntry[] = [];
    // Use BFS to traverse entire directory/file structure
    const queue = [];
    // Unfortunately dataTransferItemList is not iterable i.e. no forEach
    for (let i = 0; i < dataTransferItemList.length; i++) {
      queue.push(dataTransferItemList[i].webkitGetAsEntry());
    }
    while (queue.length > 0) {
      const entry: FileSystemFileEntry = queue.shift()!;
      if (entry.isFile) {
        fileEntries.push(entry);
      } else if (entry.isDirectory) {
        queue.push(
          ...(await this.readAllDirectoryEntries((entry as any).createReader()))
        );
      }
    }
    return fileEntries;
  }

  // Get all the entries (files or sub-directories) in a directory
  // by calling readEntries until it returns empty array
  private async readAllDirectoryEntries(
    directoryReader: FileSystemDirectoryReader
  ) {
    const entries: any = [];
    let readEntries: any = await this.readEntriesPromise(directoryReader);
    while (readEntries.length > 0) {
      entries.push(...readEntries);
      readEntries = await this.readEntriesPromise(directoryReader);
    }
    return entries;
  }

  private async readEntriesPromise(directoryReader: FileSystemDirectoryReader) {
    try {
      return await new Promise((resolve, reject) => {
        directoryReader.readEntries(resolve, reject);
      });
    } catch (err) {
      console.log(err);
    }
  }

  private async getFile(fileEntry: FileSystemFileEntry): Promise<File> {
    return await new Promise<File>((resolve, reject) =>
      fileEntry.file(resolve, reject)
    );
  }

  async onDrop(e: DragEvent) {
    this.preventDefaults(e);
    this.files = [];

    const items = e.dataTransfer?.items;

    if (items) {
      const result = await this.getAllFileEntries(items);

      const files: File[] = [];

      for (const entry of result) {
        const test: File = await this.getFile(entry);

        files.push(test);
      }
      this.files = files;

      this.dispatchEvent(
        new UUIFileDropzoneEvent(UUIFileDropzoneEvent.FILE_DROP)
      );
    }

    // const dt = e.dataTransfer;

    // if (dt?.files) {
    //   const files: File[] = [];

    //   if (this.directory) {
    //     console.warn('directory upload is not yet implemented', files);
    //   } else {
    //     for (let i = 0; i < dt.items.length; i++) {
    //       if (this.checkIsItDirectory(dt.items[i])) continue;
    //       if (dt.items[i].getAsFile()) {
    //         files.push(dt.items[i].getAsFile() as File);
    //       }
    //     }
    //   }

    //   this.files = files;
    //   this.dispatchEvent(
    //     new UUIFileDropzoneEvent(UUIFileDropzoneEvent.FILE_DROP)
    //   );
    // }
  }
  onDragOver(e: DragEvent) {
    this.preventDefaults(e);
  }
  onDragEnter(e: DragEvent) {
    this.preventDefaults(e);
  }
  onDragLeave(e: DragEvent) {
    this.preventDefaults(e);
  }

  private preventDefaults(e: DragEvent) {
    e.preventDefault();
    e.stopPropagation();
  }

  protected openNativeInput() {
    this.input.click();
  }

  private _onFileInputChange() {
    this.files = this.input.files ? Array.from(this.input.files) : [];
    this.dispatchEvent(
      new UUIFileDropzoneEvent(UUIFileDropzoneEvent.FILE_DROP)
    );
  }

  render() {
    return html`<slot></slot
      ><input
        @click=${(e: Event) => e.stopImmediatePropagation()}
        id="input"
        type="file"
        accept=${this.accept}
        ?multiple=${this.multiple}
        @change=${this._onFileInputChange} /><label id="input-label" for="input"
        >${this.renderLabel()}</label
      >`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'uui-file-dropzone': UUIFileDropzoneElement;
  }
}
