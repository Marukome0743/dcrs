# 要件ドキュメント

## はじめに

本機能は、現在 Amazon S3 に依存している画像ストレージ処理に対して、Vercel Blob を代替ストレージプロバイダーとして追加するものである。環境変数 `BLOB_READ_WRITE_TOKEN` の存在有無により、アプリケーションの画像アップロード・取得・削除処理のストレージバックエンドを自動的に判定する。`BLOB_READ_WRITE_TOKEN` が設定されている場合は Vercel Blob を使用し、未設定の場合は S3 をデフォルトとして使用する。フロントエンド側の変更は不要とし、バックエンドのストレージ抽象化レイヤーで切り替えを実現する。

## 用語集

- **Storage_Provider_Switch**: 環境変数 `BLOB_READ_WRITE_TOKEN` の存在有無に基づいてストレージバックエンド（S3 または Vercel Blob）を自動判定する仕組み。トークンが存在する場合は Vercel Blob を、存在しない場合は S3 を選択する
- **Storage_Client**: 画像のアップロード・取得・削除操作を提供するストレージ抽象化インターフェース
- **S3_Backend**: Amazon S3 を使用した既存のストレージバックエンド実装
- **Vercel_Blob_Backend**: Vercel Blob を使用した新規ストレージバックエンド実装
- **Image_API**: 画像のアップロード・取得を処理する API ルート（`app/api/users/route.ts` および `app/api/image/[key]/route.ts`）
- **BLOB_READ_WRITE_TOKEN**: Vercel Blob への認証に使用するトークン環境変数。この変数の存在有無がストレージバックエンドの自動判定基準となる

## 要件

### 要件 1: ストレージプロバイダーの自動判定

**ユーザーストーリー:** 開発者として、環境変数 `BLOB_READ_WRITE_TOKEN` の設定有無だけでストレージバックエンドが自動的に切り替わるようにしたい。これにより、追加の設定なしにデプロイ環境に応じて S3 と Vercel Blob を使い分けられるようにする。

#### 受け入れ基準 1

1. WHEN 環境変数 `BLOB_READ_WRITE_TOKEN` が設定されている場合、THE Storage_Provider_Switch SHALL Vercel_Blob_Backend を使用してストレージ操作を実行する
2. WHEN 環境変数 `BLOB_READ_WRITE_TOKEN` が未設定の場合、THE Storage_Provider_Switch SHALL S3_Backend をデフォルトとして使用する
3. WHEN 環境変数 `BLOB_READ_WRITE_TOKEN` が空文字列に設定されている場合、THE Storage_Provider_Switch SHALL S3_Backend をデフォルトとして使用する
4. THE Storage_Provider_Switch SHALL アプリケーション起動時にストレージバックエンドの判定を1回実行し、その結果をアプリケーションのライフサイクル全体で維持する

### 要件 2: ストレージ抽象化インターフェース

**ユーザーストーリー:** 開発者として、ストレージ操作を統一的なインターフェースで扱いたい。これにより、ストレージバックエンドの追加・変更時にAPI層のコード変更を最小限に抑えられるようにする。

#### 受け入れ基準 2

1. THE Storage_Client SHALL 画像のアップロード（upload）、取得（get）、削除（delete）の3つの操作を提供する
2. THE Storage_Client SHALL アップロード操作でファイルのバイナリデータ、コンテンツタイプ、キー名を受け取る
3. THE Storage_Client SHALL 取得操作でキー名を受け取り、画像データとコンテンツタイプを返す
4. THE Storage_Client SHALL 削除操作でキー名を受け取り、削除結果を返す
5. THE S3_Backend SHALL Storage_Client インターフェースを実装し、既存の S3 操作ロジックを維持する
6. THE Vercel_Blob_Backend SHALL Storage_Client インターフェースを実装する

### 要件 3: Vercel Blob への画像アップロード

**ユーザーストーリー:** ユーザーとして、Vercel Blob 環境でも画像をアップロードしたい。これにより、Vercel にデプロイされた環境で画像保存が正常に動作するようにする。

#### 受け入れ基準 3

1. WHEN 画像アップロードリクエストを受信した場合、THE Vercel_Blob_Backend SHALL 画像を Vercel Blob にアップロードする
2. WHEN アップロードが成功した場合、THE Vercel_Blob_Backend SHALL アップロードされた画像の URL を返す
3. IF Vercel Blob へのアップロードが失敗した場合、THEN THE Vercel_Blob_Backend SHALL エラーレスポンスを返す
4. THE Vercel_Blob_Backend SHALL アップロード時にコンテンツタイプを正しく設定する
5. THE Vercel_Blob_Backend SHALL 認証に環境変数 `BLOB_READ_WRITE_TOKEN` を使用する

### 要件 4: Vercel Blob からの画像取得

**ユーザーストーリー:** ユーザーとして、Vercel Blob に保存された画像を取得したい。これにより、Vercel 環境でアップロード済みの画像を正常に表示できるようにする。

#### 受け入れ基準 4

1. WHEN 画像取得リクエストをキー名で受信した場合、THE Vercel_Blob_Backend SHALL Vercel Blob から該当する画像データを取得する
2. WHEN 画像取得が成功した場合、THE Vercel_Blob_Backend SHALL 画像データとコンテンツタイプを含むレスポンスを返す
3. IF 指定されたキーの画像が Vercel Blob に存在しない場合、THEN THE Vercel_Blob_Backend SHALL 適切なエラーレスポンスを返す

### 要件 5: Vercel Blob からの画像削除

**ユーザーストーリー:** 開発者として、Vercel Blob に保存された画像を削除したい。これにより、ユーザー登録失敗時のロールバック処理が Vercel Blob 環境でも正常に動作するようにする。

#### 受け入れ基準 5

1. WHEN 画像削除リクエストをキー名で受信した場合、THE Vercel_Blob_Backend SHALL Vercel Blob から該当する画像を削除する
2. IF 削除対象の画像が Vercel Blob に存在しない場合、THEN THE Vercel_Blob_Backend SHALL エラーを発生させずに正常に処理を完了する

### 要件 6: 既存 API ルートの統合

**ユーザーストーリー:** 開発者として、既存の API ルートがストレージ抽象化レイヤーを使用するようにしたい。これにより、API の外部インターフェースを変更せずにストレージバックエンドを切り替えられるようにする。

#### 受け入れ基準 6

1. THE Image_API SHALL Storage_Client インターフェースを通じてストレージ操作を実行する
2. THE Image_API SHALL 画像アップロード API（POST /api/users）の外部インターフェースを変更しない
3. THE Image_API SHALL 画像取得 API（GET /api/image/[key]）の外部インターフェースを変更しない
4. WHEN ユーザー登録が失敗した場合、THE Image_API SHALL 選択されたストレージバックエンドから画像を削除するロールバック処理を実行する
