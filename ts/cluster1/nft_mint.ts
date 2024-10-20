import { createUmi } from "@metaplex-foundation/umi-bundle-defaults"
import { createSignerFromKeypair, signerIdentity, generateSigner, percentAmount } from "@metaplex-foundation/umi"
import { createNft, mplTokenMetadata } from "@metaplex-foundation/mpl-token-metadata";

import wallet from "../wba-wallet.json"
import base58 from "bs58";

const RPC_ENDPOINT = "https://api.devnet.solana.com";
const umi = createUmi(RPC_ENDPOINT);

let keypair = umi.eddsa.createKeypairFromSecretKey(new Uint8Array(wallet));
const myKeypairSigner = createSignerFromKeypair(umi, keypair);
umi.use(signerIdentity(myKeypairSigner));
umi.use(mplTokenMetadata())

const mint = generateSigner(umi);

(async () => {
    // https://arweave.net/B2tNDLvDfriAj46spBWr2S8KvXrU4awar7Gm4ydkfza2
    let tx = createNft(umi, { mint, sellerFeeBasisPoints: percentAmount(5), name: "MosesRug", symbol: "MRG", uri: "https://devnet.irys.xyz/B2tNDLvDfriAj46spBWr2S8KvXrU4awar7Gm4ydkfza2" })
    let result = await tx.sendAndConfirm(umi);
    const signature = base58.encode(result.signature);

    console.log(`Succesfully Minted! Check out your TX here:\nhttps://explorer.solana.com/tx/${signature}?cluster=devnet`)
    //FSdVgD19g3pvmSLZxYdo7PQ9QMCvcUkQYWbMUP1uaP7o

    console.log("Mint Address: ", mint.publicKey);
})();