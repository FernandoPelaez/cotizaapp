import PlantillasCategoryPageView from "@/components/dashboard/plantillas/pages/PlantillasCategoryPageView"

type CategoriaPageProps = {
  params: Promise<{
    categoria: string
  }>
}

export default async function CategoriaPage({
  params,
}: CategoriaPageProps) {
  const { categoria } = await params

  return <PlantillasCategoryPageView categoria={categoria} />
}
