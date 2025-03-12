import prisma from "$lib/prisma";

/** @type {import('./$types').PageServerLoad} */
export async function load({ url }) {
    const token = url.searchParams.get("token");

    if (!token) {
        return { message: "Ungültiger Token" }; // Return error message if no token
    }

    try {
        const user = await prisma.users.findUnique({
            where: { verificationToken: token },
        });

        if (!user) {
            return { message: "Ungültiger oder abgelaufener Token" }; // Token invalid or expired
        }

        // Update the user's verification status
        await prisma.users.update({
            where: { id: user.id },
            data: {
                isVerified: true,
                verificationToken: null, // Remove token after use
            },
        });

        // Return success message
        return { message: "✅ Deine E-Mail wurde erfolgreich verifiziert!" };

    } catch (error) {
        console.error("Verifizierungsfehler:", error);
        return { message: "Fehler bei der E-Mail-Verifizierung." }; // Error during verification
    }
}
