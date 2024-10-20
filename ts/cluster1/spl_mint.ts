import { Keypair, PublicKey, Connection, Commitment } from "@solana/web3.js";
import { getOrCreateAssociatedTokenAccount, mintTo } from '@solana/spl-token';
import wallet from "../../wba-wallet.json"

// Import our keypair from the wallet file
const keypair = Keypair.fromSecretKey(new Uint8Array(wallet));

//Create a Solana devnet connection
const commitment: Commitment = "confirmed";
const connection = new Connection("https://api.devnet.solana.com", commitment);

const token_decimals = 1_000_000n;

// Mint address
const mint = new PublicKey("BJ6XrAnvNPucUADRhsDabd6W4HnhFw7UgtUXRTC5Yec7");

(async () => {
    try {
        // Create an ATA
        const ata = await getOrCreateAssociatedTokenAccount(connection, keypair, mint, keypair.publicKey)
        console.log(`Your ata is: ${ata.address.toBase58()}`); //Eq4XHHcZy8C8oDyCNonk4hA6ESS49fSpCFQVxSs5cGGR

        // Mint to ATA
        const mintTx = await mintTo(connection, keypair, mint, ata.address, keypair.publicKey, token_decimals)
        console.log(`Your mint txid: ${mintTx}`); //4hLq5PQVVsXcAzesRPcxQ2GgaiP5s6sdfYJzwt1MCzoyMm7f2FS96CDLKBcpLkfd64WPUBbRDU2Nr3rsxsUXkah
    } catch (error) {
        console.log(`Oops, something went wrong: ${error}`)
    }
})()
