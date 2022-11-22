
// カレントディレクトリ取得用のJSON構造体
// curl -X GET /api/pwd

type pwdRecord = {
  cd: string;
};

export default pwdRecord;
