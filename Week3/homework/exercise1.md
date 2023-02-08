**1.What columns violate 1NF?**
-food_code and food_description columns contain multiple values
-dinner_date violates 1NF because date formats are different .

**2.What entities do you recognize that could be extracted?**
Member, Dinner, Venue, and Food.

**3.Name all the tables and columns that would make a 3NF compliant solution.**

_Member_

| member_id | member_name | member_address |
| :-------- | :---------: | -------------: |

_Dinner_

| dinner_id | dinner_date |
| :-------- | ----------: |

_Venues_

| venue_code | venue_description |
| :--------- | ----------------: |

_Food_

| food_code | food_description |
| :-------- | ---------------: |

_member_dinner_

| id  | member_id | dinner_id |
| :-- | :-------: | --------: |

_member_venue_

| id  | member_id | venue_code |
| :-- | :-------: | ---------: |

_member_food_

| id  | member_id | food_code |
| :-- | :-------: | --------: |
