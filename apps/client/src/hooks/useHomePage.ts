import { useGetFormsQuery } from "../store/api/api"

export const useHomePage = () => {
    const { data, isLoading, isError } = useGetFormsQuery()

    return {
        forms: data?.forms ?? [],
        isLoading,
        isError,
    }
}
