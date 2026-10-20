# ストレージ移行ガイド

XFSのアーカイブノードで、2 TBのHDDから5 TBのHDDへデータを移行した手順です。USB接続とUbuntu 24.04 LTSを使用した運用例を紹介します。

## 環境と構成

データ使用量の増加に対応するため、稼働中のアーカイブノードをより大きなHDDへ移行しました。Ubuntu 24.04 LTS、XFSファイルシステム、USB接続のポータブルHDD（2 TB・5 TB）を使用しています。

| 役割 | マシン | 構成 |
| --- | --- | --- |
| 稼働中のアーカイブノード | マシンA | 2 TBのHDDを /var/lib/astar にマウント |
| 移行作業用 | マシンB | 2 TBと5 TBの両方のHDDを接続 |

以下のデバイス名は、この作業例のものです。パーティション作成・フォーマットの前に、必ず自分の機材で対象ディスクを確認してください。

## 1. マシンAでサービスを停止する

稼働中のサービスを停止します。

```bash
# sudo systemctl stop astar.service
```

データディレクトリをアンマウントします。

```bash
# sudo umount /var/lib/astar
```

## 2-1. マシンBにディスクを接続する

2 TBと5 TBの両方のHDDを物理的に接続し、デバイスを確認します。

```bash
# lsblk -o NAME,SIZE,TYPE,MODEL
```

出力例：

```
sdc  1.8T disk ST2000LM007-1R8174
└─sdc1 1.8T part
sdd  4.5T disk WDC WD50NDZW-11BCSS0
└─sdd1 4.5T part
```

この例では、sdcが2 TB、sddが5 TBのHDDです。

## 2-2. 5 TBのHDDにパーティションを作成する

GPTラベルを作成します。この操作は対象ディスクの既存のパーティション情報を置き換えます。

```bash
# sudo parted /dev/sdd mklabel gpt
```

次のように0%を開始位置に指定すると、アラインメントの警告が出る場合があります。

```bash
# sudo parted -a optimal /dev/sdd mkpart primary xfs 0% 100%
```

警告例：

```
The closest location we can manage is 17.4kB to 1048kB (sectors 34..2047).
```

パーティションの開始位置が2048セクタ（1 MiB）境界になっていないことを示します。性能に関わるため、無視しないでください。

正しい作成例では、開始位置を1 MiBにそろえます。

```bash
# sudo parted -a optimal /dev/sdd mkpart primary xfs 1MiB 100%
```

## 2-3. パーティションを確認する

```bash
# lsblk -o NAME,SIZE,FSTYPE,MOUNTPOINT /dev/sdd
```

出力例：

```
sdd     4.5T
└─sdd1  4.5T ntfs
```

## 2-4. XFSでフォーマットする

対象パーティションにXFSファイルシステムを作成します。対象の既存データは失われます。

```bash
# sudo mkfs.xfs -f /dev/sdd1
```

出力は省略しています。

## 2-5. XFSの作成を確認する

```bash
# lsblk -o NAME,SIZE,FSTYPE,MOUNTPOINT /dev/sdd
```

```
sdd     4.5T
└─sdd1  4.5T xfs
```

## 2-6. 両方のディスクをマウントする

```bash
# sudo mkdir /a /b
# sudo mount /dev/sdc1 /a
# sudo mount /dev/sdd1 /b
```

マウント状況を確認します。

```bash
# lsblk -o NAME,SIZE,FSTYPE,MOUNTPOINT /dev/sdc /dev/sdd
```

## 2-7. XFS dumpとrestoreで移行する

2 TBから5 TBへデータをコピーします。

```bash
# sudo xfsdump -J - /a | sudo xfsrestore -J - /b
```

この作業例ではUSB 3.0で約15時間かかりました。出力は省略しています。

## 2-8. 移行したデータを確認する

```bash
# sudo ls -al /b
```

## 2-9. XFSの整合性を確認する（任意）

復元先をアンマウントします。

```bash
# sudo umount /b
```

読み取り専用のチェックを行います。

```bash
# sudo xfs_repair -n /dev/sdd1
```

出力は省略しています。

## 2-10. アンマウントして取り外す

```bash
# sudo sync
# sudo umount /a
# sudo umount /b
```

完了後、両方のHDDを物理的に取り外します。

## 3. マシンAで接続し直して再開する

5 TBのHDDを接続し、デバイスを確認します。

```bash
# lsblk -o NAME,SIZE,FSTYPE,MOUNTPOINT /dev/sdb
```

出力例：

```
sdb     4.5T
└─sdb1  4.5T xfs
```

新しいディスクをマウントします。

```bash
# sudo mount /dev/sdb1 /var/lib/astar
```

サービスを開始します。

```bash
# sudo systemctl start astar.service
```

ログを確認します。

```bash
# journalctl -f -u astar.service -n 100
```
