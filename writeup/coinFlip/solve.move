module solution::coin_flip_solution {

    // [*] Import dependencies
    use sui::tx_context::TxContext;
    use challenge::coin_flip;
    use challenge::coin_flip::{Game};
    use sui::coin::{Self, Coin};
    use sui::sui::SUI;

    // [*] Public functions
    public entry fun solve(game: &mut Game, stake: &mut Coin<SUI>, ctx: &mut TxContext) {
        
        /* add solution here */
        let pay_coin = coin::split(stake,10,ctx);
        coin_flip::start_game(game,pay_coin,ctx);
        
        // 111100111001
        // let's stick with 171 (1/256)
        let pay_coin = coin::split(stake,10,ctx);
        coin_flip::play_game(game, 0, pay_coin, ctx);
        let pay_coin = coin::split(stake,10,ctx);
        coin_flip::play_game(game, 0, pay_coin, ctx);
        let pay_coin = coin::split(stake,10,ctx);
        coin_flip::play_game(game, 1, pay_coin, ctx);
        let pay_coin = coin::split(stake,10,ctx);
        coin_flip::play_game(game, 0, pay_coin, ctx);
        let pay_coin = coin::split(stake,10,ctx);
        coin_flip::play_game(game, 1, pay_coin, ctx);
        let pay_coin = coin::split(stake,10,ctx);
        coin_flip::play_game(game, 1, pay_coin, ctx);
        let pay_coin = coin::split(stake,10,ctx);
        coin_flip::play_game(game, 0, pay_coin, ctx);
        let pay_coin = coin::split(stake,10,ctx);
        coin_flip::play_game(game, 0, pay_coin, ctx);
        let pay_coin = coin::split(stake,10,ctx);
        coin_flip::play_game(game, 0, pay_coin, ctx);
        let pay_coin = coin::split(stake,10,ctx);
        coin_flip::play_game(game, 0, pay_coin, ctx);
        let pay_coin = coin::split(stake,10,ctx);
        coin_flip::play_game(game, 0, pay_coin, ctx);
        let pay_coin = coin::split(stake,10,ctx);
        coin_flip::play_game(game, 0, pay_coin, ctx);
    }
}
