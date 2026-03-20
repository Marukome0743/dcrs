# 実装計画: Vercel Blob Storage

## 概要

Strategy パターンによるストレージ抽象化レイヤーを導入し、既存の S3 直接依存を `StorageClient` インターフェースの背後に隠蔽する。`@vercel/blob` パッケージを追加し、環境変数 `BLOB_READ_WRITE_TOKEN` の存在有無でバックエンドを自動判定するファクトリ関数を実装する。既存 API ルートを統合し、外部インターフェースは変更しない。

## Tasks

- [ ] 1. StorageClient インターフェースとファクトリ関数の作成
  - [ ] 1.1 `app/lib/storage/index.ts` を作成し、`UploadParams`、`GetResult`、`StorageClient` インターフェースを定義する
    - `UploadParams`: `key: string`, `body: Buffer`, `contentType: string`
    - `GetResult`: `body: ReadableStream | Buffer`, `contentType: string`
    - `StorageClient`: `upload`, `get`, `delete` メソッド
    - _Requirements: 2.1, 2.2, 2.3, 2.4_

  - [ ] 1.2 同ファイルにファクトリ関数 `createStorageClient()` とシングルトンエクスポート `storageClient` を実装する
    - `BLOB_READ_WRITE_TOKEN` が存在し非空の場合は `VercelBlobBackend` を返す
    - それ以外は `S3Backend` を返す
    - モジュールレベルのシングルトンとしてエクスポートする
    - _Requirements: 1.1, 1.2, 1.3, 1.4_

  - [ ]* 1.3 ファクトリ関数のプロパティベーステストを作成する
    - `fast-check` パッケージをインストールし、`app/lib/storage/__tests__/storage.test.ts` にテストを作成する
    - **Property 1: 非空トークンは VercelBlobBackend を選択する**
    - **Validates: Requirements 1.1**

- [ ] 2. S3Backend の実装
  - [ ] 2.1 `app/lib/storage/s3-backend.ts` を作成し、`StorageClient` インターフェースを実装する
    - 既存の `app/lib/s3client.ts` の S3Client インスタンスを使用する
    - `upload`: `PutObjectCommand` で画像をアップロードし、キーを URL として返す
    - `get`: `GetObjectCommand` で画像データとコンテンツタイプを取得する
    - `delete`: `DeleteObjectCommand` で画像を削除する
    - _Requirements: 2.5_

  - [ ]* 2.2 S3Backend のユニットテストを作成する
    - AWS SDK コマンドをモックし、各メソッドが正しいコマンドを発行することを検証する
    - _Requirements: 2.5_

- [ ] 3. VercelBlobBackend の実装
  - [ ] 3.1 `@vercel/blob` パッケージを `package.json` に追加する
    - _Requirements: 3.5_

  - [ ] 3.2 `app/lib/storage/vercel-blob-backend.ts` を作成し、`StorageClient` インターフェースを実装する
    - `upload`: `put()` で画像をアップロードし、`addRandomSuffix: false` を指定する
    - `get`: `head()` でメタデータを取得し、`fetch` で画像データを取得する
    - `delete`: `del()` で画像を削除し、存在しない場合もエラーを握りつぶす
    - _Requirements: 2.6, 3.1, 3.2, 3.4, 4.1, 4.2, 4.3, 5.1, 5.2_

  - [ ]* 3.3 VercelBlobBackend のプロパティベーステストを作成する（ラウンドトリップ）
    - `@vercel/blob` をモックし、`app/lib/storage/__tests__/storage.test.ts` にテストを追加する
    - **Property 2: アップロード→取得ラウンドトリップ**
    - **Validates: Requirements 3.1, 3.2, 3.4, 4.1, 4.2**

  - [ ]* 3.4 VercelBlobBackend のプロパティベーステストを作成する（削除後取得不可）
    - **Property 3: アップロード→削除→取得不可**
    - **Validates: Requirements 5.1**

- [ ] 4. チェックポイント - ストレージレイヤーの検証
  - すべてのテストが通ることを確認し、不明点があればユーザーに質問する。

- [ ] 5. 既存 API ルートの統合
  - [ ] 5.1 `app/api/users/route.ts` を `storageClient` を使用するようにリファクタリングする
    - `@aws-sdk/client-s3` の直接インポートを削除する
    - `postImage` 関数を `storageClient.upload()` を使用するように変更する
    - `deleteImage` 関数を `storageClient.delete()` を使用するように変更する
    - DB 挿入失敗時のロールバック処理（`storageClient.delete()`）を維持する
    - 外部インターフェース（リクエスト/レスポンス形式）は変更しない
    - _Requirements: 6.1, 6.2, 6.4_

  - [ ] 5.2 `app/api/image/[key]/route.ts` を `storageClient` を使用するようにリファクタリングする
    - `@aws-sdk/client-s3` の直接インポートを削除する
    - `storageClient.get()` を使用して画像を取得する
    - 外部インターフェース（リクエスト/レスポンス形式）は変更しない
    - _Requirements: 6.1, 6.3_

  - [ ]* 5.3 DB 挿入失敗時のロールバックのプロパティベーステストを作成する
    - `storageClient` をモックし、DB 挿入失敗時に `delete` が呼び出されることを検証する
    - **Property 4: DB 挿入失敗時のロールバック**
    - **Validates: Requirements 6.4**

- [ ] 6. 最終チェックポイント - 全テスト通過確認
  - すべてのテストが通ることを確認し、不明点があればユーザーに質問する。

## Notes

- `*` マーク付きのタスクはオプションであり、MVP のためにスキップ可能
- 各タスクは特定の要件を参照しトレーサビリティを確保
- チェックポイントでインクリメンタルな検証を実施
- プロパティベーステストは `fast-check` を使用し、設計ドキュメントの正確性プロパティを検証
- ユニットテストは `bun test` で実行
