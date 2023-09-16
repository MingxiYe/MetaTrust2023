module solution::friendly_fire_solution {
    use sui::tx_context::TxContext;
    use challenge::friendly_fire;

    public entry fun solve(status: &mut friendly_fire::Status, ctx: &mut TxContext) {
        friendly_fire::prestige(status, std::string::utf8(b"0x31337690420"), ctx);
    }
}


