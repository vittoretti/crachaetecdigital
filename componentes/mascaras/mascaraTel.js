export function MascaraTel(value:string){
  const apenasnumeros = value.replace(/\D/g, '')
  return apenasnumeros.replace(/(\d{2})(\d{5})(\d{4})$/, "($1)$2-$3")
}