import { useSound } from "@vueuse/sound";
import carrinho from "@/assets/sound/carrinho.wav";

export default function useCarrinho(){
    const { play } = useSound(carrinho);

    return play;
}