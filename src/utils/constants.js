export const ENTITIES = {
        'customer': 'CUS',
        'merchant': 'MER',
        'financer': 'FIN',
        'employee': 'EMP',
        'contract_worker': 'CNW',
        'family': 'FAM',
        'dealer': 'DLR',
        'government': 'GOV',
        'broker': 'BRK',
        'owner': 'OWN'
}

export const ENTITY_TYPES = [
    'customer',
    'merchant',
    'financer',
    'employee',
    'contract_worker', 
    'family',
    'dealer',
    'government',
    'broker',
    'owner'
]

export const PROJECTS = {
    BGC: 'Balaji Green City',
    BPD: 'Balaji Paradise',
    BBB: 'Bahubali Bungalows',
    POB: 'Post Office Building',
    AHP: 'Ahinsapuri',
    OTH: 'Other'
}

export const PAYMENT_MODES = ['cash', 'cheque', 'bank-transfer', 'RTGS', 'UPI', 'other']

export const TRANSACTION_TYPES = [ 'credit', 'debit']

export const CREDIT_SOURCE = [
    'customer-direct',
    'customer-loan',
    'dealer', 
    'financer', 
    'self-loan', 
    'company', 
    'brokerage',
    'rent', 
    'self-credit',
    'government',
    'other'
]

export const EXPENSE_SOURCE = [
    'salary',
    'loan-interest',
    'loan-emi',
    'rent',
    'material-bill',
    'service-bill',
    'utility-bill',
    'property-purchase',
    'registry',
    'advocate',
    'tax',
    'self-debit',
    'brokerage',
    'other'
]

export const MATERIAL_TYPE = [
    'cement',
    'sand',
    'aggregate',
    'brick',
    'steel',
    'pop',
    'aluminium/fibre',
    'glass',
    'MATERIAL_masonary',
    'MATERIAL_flooring',
    'MATERIAL_plumbing',
    'MATERIAL_electrical',
    'MATERIAL_painting',
    'MATERIAL_carpentry',
    'MATERIAL_interior',
    'MATERIAL_other'
]

export const SERVICE_TYPE = [
    'SERVICE_mason',
    'SERVICE_labour',
    'SERVICE_carpenter',
    'SERVICE_plumber',
    'SERVICE_electrician',
    'SERVICE_painter',
    'SERVICE_flooring',
    'SERVICE_interior',
    'SERVICE_civil',
    'SERVICE_lawyer',
    'SERVICE_machinery',
    'SERVICE_other'
]

export const UTILITY_TYPE = [
    'UTILITY_electricity',
    'UTILITY_water',
    'UTILITY_fuel',
    'UTILITY_printing',
    'UTILITY_advertisement',
    'UTILITY_emitra',
    'UTILITY_registry',
    'BILL_other'
]

export const REL_TIME_PERIODS = [
    'last-24-hours',
    'last-7-days',
    'last-30-days',
    'last-90-days',
    'last-365-days',
]