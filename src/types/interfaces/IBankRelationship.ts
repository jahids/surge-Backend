export interface IBankRelationship {
    account_owner_name: string;
    bank_account_type: "CHECKING" | "SAVINGS";
    bank_account_number: string;
    bank_routing_number: string;
    nickname?: string;
    processor_token?: string;
    instant?: boolean;
}
