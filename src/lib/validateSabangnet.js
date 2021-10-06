export default function validateSabangnet({ id, key }) {
  const errors = {};
  if (!id) {
    errors.id = '이메일이 입력되지 않앗습니다.';
  }
  if (!key) {
    errors.key = '비밀번호가 입력되지 않았습니다.';
  }

  return errors;
}
