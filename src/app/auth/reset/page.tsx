import ResetPasswordView from "@/components/auth/reset-password/ResetPasswordView"

export default async function ResetPasswordPage({
  searchParams,
}: {
  searchParams: Promise<{ token?: string }>
}) {
  const params = await searchParams
  const token = params.token ?? ""

  return <ResetPasswordView token={token} />
}
