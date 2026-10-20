# アーカイブノードの構築

Astarアーカイブノードの構築は、[公式のアーカイブノードガイド](https://docs.astar.network/docs/build/nodes/archive-node/)を参照してください。

## 構築環境を選ぶ

Peers Programの機材要件は、アーカイブノードの運用経験に基づく独自のものです。Astar公式ドキュメントの一般的な要件とは異なる場合があります。

物理マシン、仮想マシン、コンテナ、クラウドインスタンスで構築できます。ただし、物理マシン以外の構成には相応のインフラ知識が必要です。技術の専門家でない方には、**物理マシン** から始めることをおすすめします。

![物理マシン、仮想マシン、コンテナ、クラウドインスタンスの構成例](/assets/images/machines.png)

## Dockerで構築する

Dockerの構成は公式ガイドで説明されています。

- [公式Dockerガイド](https://docs.astar.network/docs/build/nodes/archive-node/docker)

## Docker Composeの構築例

参考として、Docker Composeを使ってアーカイブノードを構築する手順があります。

- [How to create an Archive Node with Docker compose.yml](https://github.com/jttech-au/Astar-Archive-Node) / 著者：Dagga

## Astarのリリース

Astarのリリースでは、macOS x86_64、Ubuntu x86_64、Linux ARM64（aarch64）のバイナリを提供しています。現在のバイナリはリリースページで確認してください。

- [Astarの最新リリース](https://github.com/AstarNetwork/Astar/releases/latest)

## 機材についての補足

- **2026年7月時点** の運用例では、HDDの使用量は **2.1 TB** でした。過去の参考値であり、現在の計測値ではありません。
- ブロックチェーンのデータはデータベースとして機能するため、容量と同じくストレージの性能も重要です。物理マシンでは消費電力も考慮してください。
- SSDを推奨します。HDDも使えますが、電源供給に注意が必要です。USBバスパワーでの接続は推奨しません。
- メモリは **8 GB以上** が安心です。4 GBのRaspberry Pi 4・5でも稼働例はありますが、8 GB以上の機材の方が安定する傾向があります。

[機材と技術の要件](/ja/requirements/)も確認してください。
