import { WxWorkBin } from './WxWorkBin'

export class WxWorkService {
  readonly bin: WxWorkBin

  constructor(bin: WxWorkBin) {
    this.bin = bin
  }
}
