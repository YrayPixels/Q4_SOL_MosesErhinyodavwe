import wallet from "../wba-wallet.json"
import { createUmi } from "@metaplex-foundation/umi-bundle-defaults"
import { createGenericFile, createSignerFromKeypair, signerIdentity } from "@metaplex-foundation/umi"
import { irysUploader } from "@metaplex-foundation/umi-uploader-irys"

// Create a devnet connection
const umi = createUmi('https://api.devnet.solana.com');

let keypair = umi.eddsa.createKeypairFromSecretKey(new Uint8Array(wallet));
const signer = createSignerFromKeypair(umi, keypair);

umi.use(irysUploader());
umi.use(signerIdentity(signer));

(async () => {
    try {
        // Follow this JSON structure
        // https://docs.metaplex.com/programs/token-metadata/changelog/v1.0#json-structure
        //https://arweave.net/DurpJBthPzuGzzK1qZtZ1a8zBfpXLaAyGHkDiKZmfVDu
        const image = "https://devnet.irys.xyz/DurpJBthPzuGzzK1qZtZ1a8zBfpXLaAyGHkDiKZmfVDu"
        const metadata = {
            name: "MosesRug",
            symbol: "MRG",
            description: "A Rugged Item",
            image: image,
            attributes: [
                { trait_type: 'Main Color', value: 'Green' }
            ],
            properties: {
                files: [
                    {
                        type: "image/png",
                        uri: "https://devnet.irys.xyz/DurpJBthPzuGzzK1qZtZ1a8zBfpXLaAyGHkDiKZmfVDu"
                    },
                ]
            },
            creators: []
        };
        const myUri = await umi.uploader.uploadJson(metadata)
        console.log("Your metadata URI: ", myUri); //https://devnet.irys.xyz/2MBUHV4hKAUh7XwwsUYvdh3ZQgmSkD42wH59RMNLCANN
    }
    catch (error) {
        console.log("Oops.. Something went wrong", error);
    }
})();
