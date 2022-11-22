
// ファイル・ディレクトリ一覧取得用のJSON構造体
// curl -X GET /api/ls

type lsRecord = {
  filename: string;
  flags: string;
  links: number;
  owner: string;
  group: string;
  size: number;
  date: Date;
  epoch: number;
  epoch_utc: number;
};

export default lsRecord;
