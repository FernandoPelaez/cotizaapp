import SignInForm from "@/components/signInForm/SigiInForm"

export default async function SignInPage({
  searchParams,
}: {
  searchParams: Promise<{ email?: string }>
}) {
  const params = await searchParams
  const initialEmail = params.email ?? ""

  return <SignInForm initialEmail={initialEmail} />
}