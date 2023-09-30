// Interface for custom class ApiError
export interface ApiError extends Error {
    success: boolean;
    message: string;
    statusCode: number;
    data: [] | {};
}

// Example User interface
export interface User {
    name: string;
}

export interface IUserMargin {
    id?: string;
    admin_configurations?: {
        allow_instant_ach?: boolean;
        disable_shorting?: boolean;
        max_margin_multiplier?: string;
    };
    user_configurations?: any; // You can replace 'any' with a specific type if needed
    account_number?: string;
    status?: string;
    crypto_status?: string;
    currency?: string;
    buying_power?: string;
    regt_buying_power?: string;
    daytrading_buying_power?: string;
    effective_buying_power?: string;
    non_marginable_buying_power?: string;
    bod_dtbp?: string;
    cash?: string;
    cash_withdrawable?: string;
    cash_transferable?: string;
    accrued_fees?: string;
    pending_transfer_out?: string;
    pending_transfer_in?: string;
    portfolio_value?: string;
    pattern_day_trader?: boolean;
    trading_blocked?: boolean;
    transfers_blocked?: boolean;
    account_blocked?: boolean;
    created_at?: string;
    trade_suspended_by_user?: boolean;
    multiplier?: string;
    shorting_enabled?: boolean;
    equity?: string;
    last_equity?: string;
    long_market_value?: string;
    short_market_value?: string;
    position_market_value?: string;
    initial_margin?: string;
    maintenance_margin?: string;
    last_maintenance_margin?: string;
    sma?: string;
    daytrade_count?: number;
    balance_asof?: string;
    previous_close?: string;
    last_long_market_value?: string;
    last_short_market_value?: string;
    last_cash?: string;
    last_initial_margin?: string;
    last_regt_buying_power?: string;
    last_daytrading_buying_power?: string;
    last_buying_power?: string;
    last_daytrade_count?: number;
    clearing_broker?: string;
}
export interface IAssetOpenPosition {
    asset_id: string;
    symbol: string;
    exchange: string;
    asset_class: string;
    asset_marginable: boolean;
    qty: string;
    avg_entry_price: string;
    side: string;
    market_value: string;
    cost_basis: string;
    unrealized_pl: string;
    unrealized_plpc: string;
    unrealized_intraday_pl: string;
    unrealized_intraday_plpc: string;
    current_price: string;
    lastday_price: string;
    change_today: string;
    qty_available: string;
}
