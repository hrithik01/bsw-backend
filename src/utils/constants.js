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
    'labour-bill',
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
    'mason',
    'labour',
    'carpenter',
    'plumber',
    'electrician',
    'painter',
    'flooring_wala',
    'interior_wala',
    'civil',
    'lawyer',
    'SERVICE_other'
]

export const UTILITY_TYPE = [
    'electricity',
    'water',
    'fuel',
    'printing',
    'advertisement',
    'emitra',
    'registry',
    'BILL_other'
]