import { AuthState } from '@/app/cytology/[id]/core/store/slices/auth.slice'

export const prepareHeaders = async (
    headers: Headers,
    { getState }: { getState: () => unknown }
) => {
    headers.set(
        'Authorization',
        `Bearer ${(getState() as { auth: AuthState }).auth.accessToken ?? ''}`
    )

    return headers
}
