import axios from "axios";

export const __latestQuotes__ = async (symbol: string) => {
    const bearer = `eyJraWQiOiJtRCtQUVhNeStQTXkwTVwvRmdVbjY0Q1l3QjgxOFF5SnArbUFBY1RSdERIcz0iLCJhbGciOiJSUzI1NiJ9.eyJjdXN0b206dmFsaWRhdGlvblJlc3BvbnNlIjoiMC5zVFhPOEs3cjd3b3c1d05TSjA5anNzSE0tTzN3S1V6elZycmszdGxEVU11UUc0NTlMZTlwXzNzZXFwQlFnam5HaDBvblhnclJXdi1RUEVydF9pSUUxTXR0U25YcUJueHZObi1aN3hFUDdndnhPRmFzbEJsY2dYdzhnVFFqcEQwMndBVmx3TkVXNTAxYWV4NTBsdkZwWnMxcEFvQzJwYVRwdkpObnpOeHpvR2xWU0RtVkxKV09qXzBHbzBCZ0RmWi00M3liRE1SMDFRUFkwN2lzTTgxN290d3VyZHpfbndTLVJoc05hZGlYYU5qVUtOZ0JvUVI0Mk9OSWNlM21mYmdDcXFXU0UzMF9CVHNGZFZ3LTRrY2s5MVlxTmpWV254czhfVjFjRHZmUU9fUlV2YnlFYjAtRmFfUnBHd1hlVFRydWhaQWJoSExnbFVqSGdLZHZtVDlKNEpmVC1oaHkwbkR0UGN3emhFSlFJUlBDWlVhNEdZTFJHcE1NRTU5YXZGcWZPYWthN1lQZmhwbnJnX2x6b2xLZnNMakVqSGpDYjdTd0dCcTNJUGxITkxOTHZpR2d3YnZxMW1VQ3dOQmZySkFNLlV6dFRSNUdkYThyUmcyY1dHZU1TRlEuNjk0ZTgxMjI5NjI3ODZhNzM4YjhmODg5OTc5OGNjZWM0MDgyY2ZmYmRmMjNkNzBiOTExNmY2MTBlNDA0YWIzYiIsImN1c3RvbTpjb3VudHJ5IjoiTEJOIiwic3ViIjoiYzE3MDRkZDItNzc4Zi00YTZiLTg1NGYtYzQxYmYyODY1OTk0IiwiZW1haWxfdmVyaWZpZWQiOnRydWUsImN1c3RvbTpsYXN0TmFtZSI6IkNhc2giLCJpc3MiOiJodHRwczpcL1wvY29nbml0by1pZHAudXMtZWFzdC0xLmFtYXpvbmF3cy5jb21cL3VzLWVhc3QtMV9DWkVCbE5WdXYiLCJjb2duaXRvOnVzZXJuYW1lIjoiYzE3MDRkZDItNzc4Zi00YTZiLTg1NGYtYzQxYmYyODY1OTk0IiwiY3VzdG9tOmNpdGl6ZW5zaGlwIjoiTGViYW5vbiIsImN1c3RvbTphY2NvdW50Q3JlYXRlZCI6Im5vIiwib3JpZ2luX2p0aSI6Ijk2YzgwNDMwLWFlNmQtNGRhZS1iMGM1LWQ4MTE1NGQ2YjVjZiIsImF1ZCI6IjN0Z2NhNm1ucDZnMTM4ZGJrY3M3bHE3ajBhIiwiZXZlbnRfaWQiOiJmYmE3OTM0Ni0wNzE0LTQxYmYtYjcwYi04ZTQ5ODFkYWE2NWIiLCJjdXN0b206Zmlyc3ROYW1lIjoiQ2FuZGFjZSIsInRva2VuX3VzZSI6ImlkIiwiYXV0aF90aW1lIjoxNjk1MDM5ODM3LCJjdXN0b206c2lnbnVwSVBBZGRyZXNzIjoiMTEzLjExLjM3LjM5IiwiY3VzdG9tOm9uYm9hcmRpbmdWZXJzaW9uIjoidjIiLCJjdXN0b206YWNjb3VudF9pZCI6IjVkNTI0ZjA1LTY0MTgtNGI5YS1hMmIzLWExMTE4NDVkZjY2MiIsImV4cCI6MTY5NTA1MjU2NSwiaWF0IjoxNjk1MDQ1MzY1LCJqdGkiOiJmNWQ2ZDIzMC0zM2RhLTQzMGQtYjZhOS02NjUyMGJiYTE3YzQiLCJlbWFpbCI6ImZhemx1bGNzZTE3QGdtYWlsLmNvbSJ9.Bc_wx-3qdLBLSx04T29r7Ex1iUosWqDZ2VNWiW3xxHgDL5oFDSFLKvHUu3AdE-HVDtNAlXlJPxG47N3E_Yx5pIM-iMU5lg9ij-RXaQmMH5vow2ykPe6re0B_ZfueZQ9DnhMp6y1xQGCknt33B0qzk41i9X6Bdztl1Xnw-1-Y0JzYEhGSlqw-6-t4_MG84KjsK5xXs6p3cBGp96_iu4zhYvhSfcDGxU8NkWc9jzmVxfQZ_IXXGJd3fyZFxVs7TO3hJP5vSgZz2082P0WKcdVv2hu6L0jdM8no48PeSy0cwjEU045FIGOiX_LCES5zKgANbM9t1fYfup-QJj7DGNAblQ`;

    try {
        const { data } = await axios.get(
            "https://app.alpaca.markets/internal/quotes",
            {
                params: {
                    symbols: symbol,
                },
                headers: {
                    Accept: "application/json",
                    Authorization: `Bearer ${bearer}`,
                },
            },
        );
        return data;
    } catch (error) {
        return null;
    }
};
