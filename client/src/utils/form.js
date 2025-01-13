export const rules = {
  required: (value) => !!value || '빼먹으셨어요.',
  minLength: (value) => value.length >= 4 || '너무 짧아요.',
  maxLength: (value) => value.length < 15 || '너무 길어요.',
  passwordCheck: (value) => value === pw.value || '비밀번호가 달라요.',
  emailCheck: (value) => /.+@.+\..+/.test(value) || '이메일 형식이 아닙니다.',
  phoneCheck: (value) =>
    /^\d{3}-\d{3,4}-\d{4}$/.test(value) || '전화번호 형식이 아닙니다.',
  nameMinLenght: (value) => value.length > 2 || '이름이 너무 짧아요.',
  nameMaxLenght: (value) => value.length < 6 || '이름이 너무 길어요.',
  nicknameMinLenght: (value) => value.length > 2 || '닉네임이 너무 짧아요.',
  nicknameMaxLenght: (value) => value.length < 15 || '닉네임이 너무 길어요.',
}

export const validations = {
  required: (value) => !!value,
  minLength: (value) => value.length >= 4,
  maxLength: (value) => value.length < 15,
  passwordCheck: (pw, pwCheck) => pw === pwCheck,
  emailCheck: (value) => /.+@.+\..+/.test(value),
  phoneCheck: (value) => /^\d{3}-\d{3,4}-\d{4}$/.test(value),
  nameMinLenght: (value) => value.length > 2,
  nameMaxLenght: (value) => value.length < 6,
  nicknameMinLenght: (value) => value.length > 2,
  nicknameMaxLenght: (value) => value.length < 15,
}
