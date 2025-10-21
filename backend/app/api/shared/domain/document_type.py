from enum import Enum


class DocumentType(str, Enum):
    """
    Enum representing different types of identification documents.
    - ID_CARD: Represents a national identification card.
    - FOREIGN_ID: Represents a foreign identification card.
    - PASSPORT: Represents a passport.
    - CITIZEN_CARD: Represents a citizen card.
    - TAX_ID: Represents a tax identification number.
    :since: 0.0.1
    """
    ID_CARD = "ID_Card"
    FOREIGN_ID = "Foreign_ID"
    PASSPORT = "Passport"
    CITIZEN_CARD = "Citizen_Card"
    TAX_ID = "Tax_ID"